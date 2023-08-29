import React, { useEffect } from "react";
import { useAudioRecorder } from "react-audio-voice-recorder";
import type { IconType } from "react-icons";
import { BsPauseFill, BsPlayFill, BsStopFill } from "react-icons/bs";

const addAudioElement = (blob: Blob) => {
  const url = URL.createObjectURL(blob);
  const audio = document.createElement("audio");
  audio.src = url;
  audio.controls = true;
  document.body.appendChild(audio);
};

const AudioButtons: React.FC<{
  setDidFinish: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ setDidFinish }) => {
  const {
    startRecording,
    stopRecording,
    togglePauseResume,
    recordingBlob,
    isRecording,
    isPaused,
  } = useAudioRecorder();

  useEffect(() => {
    if (!recordingBlob) return;
    addAudioElement(recordingBlob);
  }, [recordingBlob]);

  const uploadAudioToServer = async () => {
    if (!recordingBlob) return;

    const formData = new FormData();
    formData.append("audio", recordingBlob, "recorded_audio.wav");

    try {
      const response = await fetch("/api/process_audio", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        console.log("Audio uploaded successfully");
      } else {
        console.error("Error uploading audio");
      }
    } catch (error) {
      console.error("Error uploading audio:", error);
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
          onClick={() => {
            startRecording();
            setDidFinish(false);
          }}
          Icon={BsPlayFill}
        />
      )}

      {isRecording && (
        <IconButton
          Icon={BsStopFill}
          onClick={() => {
            stopRecording();
            setDidFinish(true);
            uploadAudioToServer(); // Upload the audio to the server after stopping recording
          }}
        />
      )}
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