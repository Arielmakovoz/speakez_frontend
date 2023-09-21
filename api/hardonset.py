import librosa
import matplotlib.pyplot as plt
import numpy as np
# PLOTS ONSET STRENGTH GRAPH, LOCATES HARD-ONSETS, COUNTS # OF HARD-ONSETS

def hardonest_tracker(audio_file):

    audio_data, sr_ = librosa.load(audio_file)

    onset_strength_lst = librosa.onset.onset_strength(y=audio_data, sr=sr_)

    onset_frames = librosa.onset.onset_detect(onset_envelope=onset_strength_lst, sr=sr_)
    times = librosa.times_like(onset_strength_lst, sr=sr_)

    fig, ax = plt.subplots()
    ax.plot(times, onset_strength_lst, label="Onset Strength")
    ax.set(title="Onset Strength Graph")
    ax.vlines(times[onset_frames], 0, onset_strength_lst.max(), color='r', alpha=0.9,
            linestyle='--', label='Onsets')
    ax.set_xlabel("Time (seconds)")
    ax.set_ylabel("Onset Strength")
    ax.legend()
    plt.show()

    print(f"Number of hard-onsets: {len(onset_frames)}")
    print(f" Hard-onset time stamps (seconds): {times[onset_frames]}")


    # Finding list of hard-onsets values
    onset_vals = onset_strength_lst[onset_frames]