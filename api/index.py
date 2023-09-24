from flask import Flask, request, jsonify
import librosa
import matplotlib.pyplot as plt
import numpy as np

app = Flask(__name__)

def hardonest_tracker(audio_file):

    audio_data, sr_ = librosa.load(audio_file)


@app.route('/api/upload-audio', methods=['POST'])
def upload_audio():

    audio_file = request.files['audio']
    if audio_file:
        hardonest_tracker(audio_file)
        # Process the audio file as needed (e.g., save it to disk, perform analysis)
        # You can add your audio processing logic here

        # Send a response to the client
        return jsonify({"message": "Audio file received"})

