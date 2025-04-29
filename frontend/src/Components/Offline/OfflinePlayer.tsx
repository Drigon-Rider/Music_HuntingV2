import { useState, useEffect } from "react";
import { useAudio } from "../SearchPage/Audio/AudioContext";
import { useQueue } from "../Queue/QueueContext"; // Import the queue context
import { Play, Pause, Plus } from "lucide-react"; // Import icons from lucide-react

export const OfflinePlayer = () => {
  const [offlineTracks, setOfflineTracks] = useState<any[]>([]);
  const { playTrack, pauseTrack, isPlaying, currentTrack } = useAudio();
  const { addToQueue } = useQueue(); // Access the addToQueue function

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
      playTrack({
        title: track.name, // Ensure the name is passed
        channel: "Offline Music", // Channel name for offline music
        audio_url: `${import.meta.env.VITE_Hosted_API}/offline-music/${track.name}`, // URL for the offline track
      });
    }
  };

  const handleAddToQueue = (track: any) => {
    addToQueue({
      title: track.name,
      channel: "Offline Music",
      audio_url: `${import.meta.env.VITE_Hosted_API}/offline-music/${track.name}`,
    });
    alert(`${track.name} added to the queue!`);
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
                <div className="flex items-center space-x-2">
                  {/* Play/Pause Button */}
                  <button
                    onClick={() => handlePlay(track)}
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200"
                  >
                    {isCurrentlyPlaying ? (
                      <Pause className="w-5 h-5 text-purple-600" />
                    ) : (
                      <Play className="w-5 h-5 text-purple-600" />
                    )}
                  </button>

                  {/* Add to Queue Button */}
                  <button
                    onClick={() => handleAddToQueue(track)}
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200"
                  >
                    <Plus className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
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