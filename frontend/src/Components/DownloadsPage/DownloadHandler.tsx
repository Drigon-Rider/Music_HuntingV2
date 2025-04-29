import React, { useState } from "react";

export const DownloadButton: React.FC = () => {
  const [url, setUrl] = useState("");

    const handleDownload = async () => {
    if (!url) {
      alert("Please enter a YouTube URL or video ID.");
      return;
    }
  
    try {
      const response = await fetch(`${import.meta.env.VITE_Hosted_API}/download`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url, // YouTube URL or video ID
          path: "./downloads", // Optional: specify a download path
          filename: null, // Optional: specify a filename
        }),
      });
  
      if (!response.ok) {
        const error = await response.json();
        alert(`Failed to start download: ${error.error}`);
        return;
      }
  
      alert("Download started successfully!");
    } catch (error) {
      console.error("Error starting download:", error);
      alert("An error occurred while starting the download.");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Download YouTube MP3</h1>
      <input
        type="text"
        placeholder="Enter YouTube URL or video ID"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded mb-4"
      />
      <button
        onClick={handleDownload}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Download MP3
      </button>
    </div>
  );
};