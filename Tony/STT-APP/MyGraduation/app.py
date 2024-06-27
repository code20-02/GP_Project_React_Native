from flask import Flask, request, jsonify
from transformers import SpeechT5Processor, SpeechT5ForTextToSpeech
from datasets import load_dataset
import torch
from transformers import SpeechT5HifiGan

app = Flask(__name__)

def generate_speech(text, speaker_id=7306):
    # Load SpeechT5 model and processor
    processor = SpeechT5Processor.from_pretrained("microsoft/speecht5_tts")
    model = SpeechT5ForTextToSpeech.from_pretrained("microsoft/speecht5_tts")

    # Process input text
    inputs = processor(text=text, return_tensors="pt")

    # Load embeddings dataset
    embeddings_dataset = load_dataset("Matthijs/cmu-arctic-xvectors", split="validation")

    # Get speaker embeddings
    speaker_embeddings = torch.tensor(embeddings_dataset[speaker_id]["xvector"]).unsqueeze(0)

    # Load HiFi-GAN vocoder
    vocoder = SpeechT5HifiGan.from_pretrained("microsoft/speecht5_hifigan")

    # Generate speech waveform
    speech = model.generate_speech(inputs["input_ids"], speaker_embeddings, vocoder=vocoder)
    
    return speech

@app.route('/')
def home():
    return "Welcome to the Flask backend!"

@app.route('/tts', methods=['POST'])
def tts():
    data = request.json
    text = data.get('text', '')
    if not text:
        return jsonify({'error': 'No text provided'}), 400
    
    try:
        audio_data = generate_speech(text)
        response = {
            'audio_data': audio_data.tolist()  # Convert tensor to list for JSON serialization
        }
        return jsonify(response)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
