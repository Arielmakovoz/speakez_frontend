from flask import Flask, request, jsonify

import wave

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = 'uploads'

@app.route('/api/process_audio', methods=['POST'])
def process_audio():
    if 'audio' not in request.files:
        return jsonify({'error': 'No audio file provided'}), 400

    audio_file = request.files['audio']
    if audio_file.filename == '':
        return jsonify({'error': 'No selected audio file'}), 400

    # Do something with the audio file, such as saving it to disk

    return jsonify({'message': 'Audio received successfully'})

# change the audio-recorder file back to normal and then disable eslint
# then change the file again and see what happens