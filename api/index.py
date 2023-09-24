from flask import Flask, request, jsonify
import librosa
import matplotlib.pyplot as plt
import numpy as np

app = Flask(__name__)

def hardonest_tracker(audio_file):

    audio_data, sr_ = librosa.load(audio_file)

    onset_strength_lst = librosa.onset.onset_strength(y=audio_data, sr=sr_)

    onset_frames = librosa.onset.onset_detect(onset_envelope=onset_strength_lst, sr=sr_)
    times = librosa.times_like(onset_strength_lst, sr=sr_)

    fig, ax = plt.subplots()
    ax.plot(times, onset_strength_lst, label="Onset Strength")
    ax.set(title="Onset Strength Graph")
    ax.vlines(times[onset_frames], 0, onset_strength_lst.max(), color='r', alpha=0.9,
            linestyle='--', label='Onsets')
    return(len(onset_frames))

@app.route('/api/upload-audio', methods=['POST'])
def upload_audio():
    try:
        audio_file = request.files['audio']
        if audio_file:
            hardonest_tracker(audio_file)
            # Process the audio file as needed (e.g., save it to disk, perform analysis)
            # You can add your audio processing logic here

            # Send a response to the client
            return jsonify({"message": "Audio file received and processed successfully"})
        else:
            return jsonify({"message": "No audio file received"}), 400
    except Exception as e:
        return jsonify({"message": f"Error: {str(e)}"}), 500

