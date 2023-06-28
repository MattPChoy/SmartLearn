import speech_recognition as sr
from pydub import AudioSegment
import os

# Load the video file
video = AudioSegment.from_file("transcript_test_files/video/test.mp4", format="mp4")
audio = video.set_channels(1).set_frame_rate(16000).set_sample_width(2)
audio.export("transcript_test_files/audio/audio.wav", format="wav")

# Initialize recognizer class (for recognizing the speech)
r = sr.Recognizer()

# Open the audio file
with sr.AudioFile("transcript_test_files/audio/audio.wav") as source:
    audio_text = r.record(source)
# Recognize the speech in the audio
# Need to download pocketSphinx

text = r.recognize_sphinx(audio_text, language='en-US')

# Print the transcript
file_name = "transcript_test_files/transcript/transcription.txt"

with open(file_name, "w") as file:
    # Write to the file
    file.write(text)