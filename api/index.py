from flask import Flask, request, jsonify
import librosa
import matplotlib.pyplot as plt
import numpy as np

app = Flask(__name__)

@app.route('/api/upload-audio', methods=['POST'])
def upload_audio():
    try:
        audio_file = request.files['audio']
        if audio_file:
            
            # Process the audio file as needed (e.g., save it to disk, perform analysis)
            # You can add your audio processing logic here

            # Send a response to the client
            return jsonify({"message": "Audio file received and processed successfully"})
        else:
            return jsonify({"message": "No audio file received"}), 400
    except Exception as e:
        return jsonify({"message": f"Error: {str(e)}"}), 500

