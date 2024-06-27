from transformers import SpeechT5Processor, SpeechT5ForTextToSpeech
from datasets import load_dataset
import torch
from transformers import SpeechT5HifiGan
from IPython.display import Audio

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

# Get user input for text
text_input = input("Enter the text to be converted to speech: ")

# Generate speech
speech_waveform = generate_speech(text_input)

# Display speech audio
Audio(speech_waveform, rate=16000)
