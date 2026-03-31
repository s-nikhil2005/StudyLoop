const rooms = new Map();

function generateRoomCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

function createRoom(userId) {

  const roomCode = generateRoomCode();

  const room = {
    roomCode,
    createdBy: userId,
    participants: new Set(),
    createdAt: new Date()
  };

  room.participants.add(userId);

  rooms.set(roomCode, room);

  console.log("Room created:", roomCode);

  return room;
}

function joinRoom(roomCode, userId) {

  const room = rooms.get(roomCode);

  if (!room) {
    return { error: "Room not found" };
  }

  room.participants.add(userId);

  return room;
}

function leaveRoom(roomCode, userId) {

  const room = rooms.get(roomCode);

  if (!room) return;

  room.participants.delete(userId);

  if (room.participants.size === 0) {
    rooms.delete(roomCode);
  }

}

function getParticipants(roomCode) {

  const room = rooms.get(roomCode);

  if (!room) return [];

  return Array.from(room.participants);
}

function getRoom(roomCode) {
  return rooms.get(roomCode);
}

module.exports = {
  createRoom,
  joinRoom,
  leaveRoom,
  getParticipants,
  getRoom

};