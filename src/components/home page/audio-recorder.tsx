/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/unbound-method */
import React, { useEffect } from "react";
import { useAudioRecorder } from "react-audio-voice-recorder";
import type { IconType } from "react-icons";
import { BsPauseFill, BsPlayFill, BsStopFill } from "react-icons/bs";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

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
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

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
    // recordingBlob will be present at this point after 'stopRecording' has been called
  }, [recordingBlob]);

  const sendAudioToServer = async () => {
    if (!recordingBlob) return;

    try {
      const formData = new FormData();
      formData.append("audio", recordingBlob);

      const response = await fetch("/api/upload-audio", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Server response:", data);
        // Handle the server response here
      } else {
        console.error("Error uploading audio file");
      }
    } catch (error) {
      console.error("Error uploading audio file:", error);
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
            void SpeechRecognition.startListening({ continuous: true });
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
            void SpeechRecognition.stopListening();
            stopRecording();
            void sendAudioToServer(); // Send audio when stopping recording
            setDidFinish(true);
          }}
        />
      )}

      <div>{transcript}</div>
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
