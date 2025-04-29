// filepath: c:\Users\LEGION\Documents\GitHub\Music_Hunting\frontend\src\Components\OfflinePlayer.tsx
import { useState, useEffect } from "react";
import { useAudio } from "../SearchPage/Audio/AudioContext";

export const OfflinePlayer = () => {
  const [offlineTracks, setOfflineTracks] = useState<any[]>([]);
  const { playTrack, pauseTrack, isPlaying, currentTrack } = useAudio();

  useEffect(() => {
    const fetchOfflineTracks = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_Hosted_API}/offline-music`);
        const data = await response.json();
        setOfflineTracks(data.files || []);
      } catch (error) {
        console.error("Error fetching offline tracks:", error);
      }
    };

    fetchOfflineTracks();
  }, []);

 const handlePlay = (track: any) => {
  if (currentTrack && currentTrack.name === track.name && isPlaying) {
    pauseTrack();
  } else {
    // Pass the track name and audio URL to playTrack
    playTrack({
      title: track.name, // Ensure the name is passed
        channel: "Offline Music", // Channel name for offline music   
      audio_url: `${import.meta.env.VITE_Hosted_API}/offline-music/${track.name}`, // URL for the offline track
    });
  }
};

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Offline Music</h1>
      {offlineTracks.length > 0 ? (
        <ul className="space-y-3">
          {offlineTracks.map((track, index) => {
            const isCurrentlyPlaying = currentTrack && currentTrack.name === track.name && isPlaying;

            return (
              <li
                key={index}
                className="p-4 border border-gray-200 rounded-lg flex items-center space-x-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-gray-900 truncate">{track.name}</h3>
                </div>
                <button
                  onClick={() => handlePlay(track)}
                  className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
                >
                  {isCurrentlyPlaying ? "Pause" : "Play"}
                </button>
              </li>
            );
          })}
        </ul>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500">No offline music available. Download some tracks to play offline!</p>
        </div>
      )}
    </div>
  );
};