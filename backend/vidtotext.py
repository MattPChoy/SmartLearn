import openai

# Load the video file
video = AudioSegment.from_file("transcript_test_files/video/test.mp4", format="mp4")
audio = video.set_channels(1).set_frame_rate(16000).set_sample_width(2)
audio.export("transcript_test_files/audio/audio.mp3", format="mp3")

audio_file = open("transcript_test_files/audio/audio.mp3", "rb")
transcript = openai.Audio.transcribe("whisper-1", audio_file)

