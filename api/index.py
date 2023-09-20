from flask import Flask, request, jsonify
from pydub import AudioSegment

app = Flask(__name__)

@app.route('/api/upload-audio', methods=['POST'])
def upload_audio():
    try:
        audio_file = request.files['audio']
        if audio_file:
            # Process the audio file as needed (e.g., save it to disk, perform analysis)
            # You can add your audio processing logic here

            # Calculate the duration of the audio in seconds
            audio = AudioSegment.from_file(audio_file)
            duration_in_seconds = len(audio) / 1000  # Duration in milliseconds, convert to seconds

            # Send a response to the client with the duration information
            return jsonify({"message": "Audio file received and processed successfully",
                            "duration_seconds": duration_in_seconds})
        else:
            return jsonify({"message": "No audio file received"}), 400
    except Exception as e:
        return jsonify({"message": f"Error: {str(e)}"}), 500