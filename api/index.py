from flask import Flask, request, jsonify
import wave

app = Flask(__name__)

@app.route('/api/upload-audio', methods=['POST'])
def upload_audio():
    try:
        audio_file = request.files['audio']
        if audio_file:
            # Process the audio file as needed (e.g., save it to disk, perform analysis)
            # You can add your audio processing logic here

            # Check the duration of the WAV file
            with wave.open(audio_file, 'rb') as wav:
                duration_seconds = float(wav.getnframes()) / wav.getframerate()

            # Send a response to the client with the duration information
            return jsonify({"message": "Audio file received and processed successfully", "duration_seconds": duration_seconds})
        else:
            return jsonify({"message": "No audio file received"}), 400
    except Exception as e:
        return jsonify({"message": f"Error: {str(e)}"}), 500