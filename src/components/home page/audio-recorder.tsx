import React, { useEffect, useState } from "react";
import { useAudioRecorder } from "react-audio-voice-recorder";
import type { IconType } from "react-icons";
import { BsPauseFill, BsPlayFill, BsStopFill } from "react-icons/bs";

const AudioButtons: React.FC = () => {
  const {
    startRecording,
    stopRecording,
    togglePauseResume,
    recordingBlob,
    isRecording,
    isPaused,
  } = useAudioRecorder();

  const [serverResponse, setServerResponse] = useState("");

  useEffect(() => {
    if (!recordingBlob) return;
    // Handle sending the recording to the Flask server
    sendRecording(recordingBlob);
  }, [recordingBlob]);

  const sendRecording = async (blob: Blob) => {
    try {
      const formData = new FormData();
      formData.append("audio", blob);

      const response = await fetch("/api/process_audio", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      setServerResponse(data.message);
    } catch (error) {
      console.error("Error sending recording:", error);
    }
  };

  return (
    <>
      {isRecording ? (
        isPaused ? (
          <IconButton onClick={togglePauseResume} Icon={BsPlayFill} />
        ) : (
          <IconButton onClick={togglePauseResume} Icon={BsPauseFill} />
        )
      ) : (
        <IconButton
          onClick={startRecording}
          Icon={BsPlayFill}
        />
      )}

      {isRecording && (
        <IconButton
          Icon={BsStopFill}
          onClick={() => stopRecording()}
        />
      )}
      {serverResponse && <p>Server Response: {serverResponse}</p>}
    </>
  );
};

export default AudioButtons;

const IconButton: React.FC<{ Icon: IconType; onClick: () => void }> = ({
  Icon,
  onClick,
}) => {
  return (
    <Icon
      onClick={onClick}
      size="1.5rem"
      className="transition-all text-bg-main-light hover:scale-110 dark:text-bg-main-dark"
    />
  );
};