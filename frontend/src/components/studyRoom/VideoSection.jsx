function VideoSection({ localVideoRef, remoteStreams }) {
  return (
    <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>

      <video ref={localVideoRef} autoPlay muted playsInline />

      {remoteStreams.map((stream, i) => (
        <video
          key={i}
          autoPlay
          playsInline
          ref={(video) => {
            if (video) video.srcObject = stream;
          }}
        />
      ))}

    </div>
  );
}

export default VideoSection;