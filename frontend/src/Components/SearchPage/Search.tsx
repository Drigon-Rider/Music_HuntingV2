import { useState } from "react";
import { Details } from "./Details";

export const Search = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [selectedResult, setSelectedResult] = useState<any | null>(null);

  const handleSearch = async () => {
    if (!query.trim()) return;

    try {
      // const response = await fetch(`http://127.0.0.1:5000/api/ytsearch?query=${encodeURIComponent(query)}`); //dont delete this please
      const response = await fetch(`https://music-hunting.onrender.com/api/ytsearch?query=${encodeURIComponent(query)}`);
      const data = await response.json();
      setResults(data.results || []);
      setSelectedResult(null); // Clear the selected result when a new search is performed
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  const handleResultClick = (result: any) => {
    setSelectedResult(result); // Set the selected result to display details
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Search Music</h1>
      <div className="mb-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for songs, artists, or albums..."
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <button
          onClick={handleSearch}
          className="mt-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-md hover:opacity-90"
        >
          Search
        </button>
      </div>
      <div>
        {results.length > 0 ? (
          <ul className="space-y-4">
            {results.map((result, index) => (
              <li
                key={index}
                className="p-4 border rounded-md flex items-center space-x-4 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleResultClick(result)}
              >
                <img
                  src={result.thumbnails[0]}
                  alt={result.title}
                  className="w-16 h-16 object-cover rounded-md"
                />
                <div>
                  <h3 className="font-bold">{result.title}</h3>
                  <p className="text-sm text-gray-500">{result.channel}</p>
                  <p className="text-sm text-gray-500">{result.duration}</p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 dark:text-gray-400">No results found.</p>
        )}
      </div>
      {/* Render the Details component if a result is selected */}
      {selectedResult && (
        <div className="mt-8">
          <Details result={selectedResult} />
        </div>
      )}
    </div>
  );
};