/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useEffect, useState } from "react";
import { useAudioRecorder } from "react-audio-voice-recorder";
import type { IconType } from "react-icons";
import { BsPauseFill, BsPlayFill, BsStopFill } from "react-icons/bs";

interface AudioButtonsProps {
  setDidFinish: React.Dispatch<React.SetStateAction<boolean>>;
}

const AudioButtons: React.FC<AudioButtonsProps> = ({ setDidFinish }) => {
  const {
    startRecording,
    stopRecording,
    togglePauseResume,
    recordingBlob,
    isRecording,
    isPaused,
  } = useAudioRecorder();

  const [serverResponse, setServerResponse] = useState<string | null>(null);

  useEffect(() => {
    if (!recordingBlob) return;

    const sendRecording = async (blob: Blob) => {
      try {
        const formData = new FormData();
        formData.append("audio", blob, "recording.wav"); // Specify "recording.wav" as the filename

        const response = await fetch("/api/hello", {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          const data = await response.json();
          setServerResponse(data.message);
        } else {
          console.error("Error sending recording: Status ", response.status);
        }
      } catch (error) {
        console.error("Error sending recording:", error);
      }
    };

    sendRecording(recordingBlob).catch((e) => console.error(e));
  }, [recordingBlob]);

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
          }}
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
