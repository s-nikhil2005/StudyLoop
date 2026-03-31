function ParticipantsPanel({ participants, userId }) {
  return (
    <div style={{
      border: "1px solid #ddd",
      padding: "10px",
      borderRadius: "10px"
    }}>
      <h3>Participants</h3>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {participants.map((p, i) => (
          <li
            key={i}
            style={{
              padding: "5px",
              background: p === userId ? "#d1e7ff" : "#f5f5f5",
              marginBottom: "5px"
            }}
          >
            {p === userId ? "You" : p}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ParticipantsPanel;