import { useState } from "react";

export const Search = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<string[]>([]);

  const handleSearch = async () => {
    if (!query.trim()) return;
  
    try {
      const response = await fetch(`http://127.0.0.1:5000/api/ytsearch?query=${encodeURIComponent(query)}`);
      const data = await response.json();
      setResults(data.results || []);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
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
          <ul className="space-y-2">
            {results.map((result, index) => (
              <li key={index} className="p-2 border rounded-md">
                {result}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 dark:text-gray-400">No results found.</p>
        )}
      </div>
    </div>
  );
};