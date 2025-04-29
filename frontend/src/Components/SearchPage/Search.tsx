import { useState } from "react";
import { useAudio } from "./Audio/AudioContext";
import { useQueue } from "../Queue/QueueContext";
import { DownloadButton } from "../DownloadsPage/DownloadButton";
import { Plus } from "lucide-react";

export const Search = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const { playTrack, pauseTrack, isPlaying, currentTrack } = useAudio();
  const { addToQueue } = useQueue();

  const handleSearch = async () => {
    if (!query.trim()) return;

    try {
      const response = await fetch(
        `${import.meta.env.VITE_Hosted_API}/ytsearch?query=${encodeURIComponent(query)}`
      );
      const data = await response.json();
      setResults(data.results || []);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  const handlePlay = (result: any) => {
    if (currentTrack && currentTrack.id === result.id && isPlaying) {
      pauseTrack();
    } else {
      playTrack(result);
    }
  };

  const handleAddToQueue = (result: any) => {
    addToQueue(result);
    alert(`${result.title} added to the queue!`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Search Music</h1>

      <div className="mb-6">
        <div className="flex">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for songs, artists, or albums..."
            className="flex-1 px-4 py-3 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          <button
            onClick={handleSearch}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-r-md hover:from-purple-700 hover:to-indigo-700 transition-colors"
          >
            Search
          </button>
        </div>
      </div>

      <div>
        {results.length > 0 ? (
          <ul className="space-y-3">
            {results.map((result, index) => {
              const isCurrentlyPlaying =
                currentTrack && currentTrack.id === result.id && isPlaying;

              return (
                <li
                  key={index}
                  className="p-4 border border-gray-200 rounded-lg flex items-center space-x-4 hover:bg-gray-50 transition-colors relative"
                >
                  <div className="relative">
                    <img
                      src={result.thumbnails[0] || "/placeholder.svg"}
                      alt={result.title}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                    <button
                      onClick={() => handlePlay(result)}
                      className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 rounded-md opacity-0 hover:opacity-100 transition-opacity"
                    >
                      {isCurrentlyPlaying ? (
                        <svg
                          className="w-8 h-8 text-white"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <rect x="6" y="4" width="4" height="16" />
                          <rect x="14" y="4" width="4" height="16" />
                        </svg>
                      ) : (
                        <svg
                          className="w-8 h-8 text-white"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      )}
                    </button>
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-gray-900 truncate">
                      {result.title}
                    </h3>
                    <p className="text-sm text-gray-500">{result.channel}</p>
                    <div className="flex items-center space-x-2 text-xs text-gray-500">
                      <span>{result.duration}</span>
                      <span>•</span>
                      <span>{result.views}</span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <div className="relative group">
                      <button
                        onClick={() => handleAddToQueue(result)}
                        className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200"
                      >
                        <Plus className="w-4.5 h-4.5" />
                      </button>
                      <span className="absolute bottom-full mb-1 left-1/2 transform -translate-x-1/2 px-2 py-1 text-xs text-gray-700 bg-gray-200 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                        Add to Queue
                      </span>
                    </div>
                    <DownloadButton
                      videoId={result.id}
                      onDownloadSuccess={() => alert("Download started successfully!")}
                      onDownloadError={(error) =>
                        alert(`Failed to start download: ${error}`)
                      }
                    />
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">
              {query
                ? "No results found. Try a different search term."
                : "Search for your favorite music!"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};