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
    // recordingTime, // How long the recording is so far
    // mediaRecorder, // "The current mediaRecorder in use. Can be undefined in case recording is not in progress"
  } = useAudioRecorder();


  useEffect(() => {
    if (!recordingBlob) return;
    addAudioElement(recordingBlob);
    // recordingBlob will be present at this point after 'stopRecording' has been called
  }, [recordingBlob]);

  // if (!browserSupportsSpeechRecognition) {
  //   return <span>Browser doesn't support speech recognition.</span>;
  // }
  // <div>
  //   <button onClick={() => SpeechRecognition.startListening()}>Start</button>
  //   <button onClick={() => SpeechRecognition.stopListening()}>Stop</button>
  //   <button onClick={() => resetTranscript()}>Reset</button>
  //   <p>{transcript}</p>
  // </div>

  // use of void is to prevent eslint from complaining, somehow the promises get awaited
  // https://github.com/orgs/react-hook-form/discussions/8622#discussioncomment-3915517
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
            void SpeechRecognition.startListening();
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
            setDidFinish(true);
          }}
        />
      )}
      {/* <AudioRecorder
        onRecordingComplete={addAudioElement}
        audioTrackConstraints={{
          noiseSuppression: true,
          echoCancellation: true,
        }}
        downloadOnSavePress={true}
        downloadFileExtension="webm"
      /> */}
      <div>
        {transcript}
      </div>
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
