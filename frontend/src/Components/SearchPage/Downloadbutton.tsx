import React from "react";

interface DownloadButtonProps {
  result: any;
}

export const DownloadButton: React.FC<DownloadButtonProps> = ({ result }) => {
  const handleDownload = () => {
    alert(`Download functionality for "${result.title}" coming soon!`);
  };

  return (
    <button
      onClick={handleDownload}
      className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md"
    >
      Download
    </button>
  );
};