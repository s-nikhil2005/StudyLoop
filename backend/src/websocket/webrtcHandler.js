const events = require("./events");

const {
  createRoom,
  joinRoom,
  leaveRoom,
  getParticipants,
  getRoom
} = require("./roomManager");

function handleWebRTCMessage(message, clients, userId) {

  const { type } = message;

  switch (type) {

    case events.CREATE_ROOM:
      createRoomHandler(clients, userId);
      break;

    case events.JOIN_ROOM:
      joinRoomHandler(message, clients, userId);
      break;

    case events.LEAVE_ROOM:
      leaveRoomHandler(message, clients, userId);
      break;

    case events.OFFER:
    case events.ANSWER:
    case events.ICE_CANDIDATE:
      forwardSignal(message, clients, userId);
      break;

    default:
      console.log("Unknown WebRTC event:", type);
  }

}

function createRoomHandler(clients, userId) {

  const room = createRoom(userId);

  const socket = clients.get(userId);

  if (socket && socket.readyState === 1) {

    socket.send(JSON.stringify({
      webrtc: true,
      type: events.ROOM_CREATED,
      roomCode: room.roomCode
    }));

  }

}

function joinRoomHandler(message, clients, userId) {

  const { roomCode } = message;

  const result = joinRoom(roomCode, userId);

  const socket = clients.get(userId);

  if (result.error) {

    socket.send(JSON.stringify({
      webrtc: true,
      type: events.JOIN_ERROR,
      error: result.error
    }));

    return;

  }

  const participants = getParticipants(roomCode);

  socket.send(JSON.stringify({
    webrtc: true,
    type: events.ROOM_JOINED,
    roomCode,
    participants
  }));

  // Notify others that user joined
  broadcastToRoom(roomCode, clients, {
    webrtc: true,
    type: "user-joined",
    userId
  }, userId);

}

function leaveRoomHandler(message, clients, userId) {

  const { roomCode } = message;

  leaveRoom(roomCode, userId);

  broadcastToRoom(roomCode, clients, {
    webrtc: true,
    type: "user-left",
    userId
  }, userId);

}

function forwardSignal(message, clients, senderId) {

  const { targetUserId } = message;

  const socket = clients.get(targetUserId);

  if (socket && socket.readyState === 1) {

    socket.send(JSON.stringify({
      ...message,
      senderId
    }));

  }

}

function broadcastToRoom(roomCode, clients, payload, excludeUser) {

  const room = getRoom(roomCode);

  if (!room) return;

  const participants = Array.from(room.participants);

  participants.forEach((id) => {

    if (id === excludeUser) return;

    const socket = clients.get(id);

    if (socket && socket.readyState === 1) {
      socket.send(JSON.stringify(payload));
    }

  });

}

module.exports = { handleWebRTCMessage };