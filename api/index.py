from flask import Flask, request, jsonify
from flask_cors import CORS
import wave

app = Flask(__name__)
CORS(app)

@app.route('/api/process_audio', methods=['POST'])
def process_audio():
    # Do something with the audio file, such as saving it to disk

    return jsonify({'message': 'Audio received successfully'})

# change the audio-recorder file back to normal and then disable eslint
# then change the file again and see what happens