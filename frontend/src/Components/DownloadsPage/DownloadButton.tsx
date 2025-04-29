import { Download } from "lucide-react";

interface DownloadButtonProps {
  videoId: string;
  onDownloadSuccess?: () => void;
  onDownloadError?: (error: string) => void;
}

export const DownloadButton: React.FC<DownloadButtonProps> = ({
  videoId,
  onDownloadSuccess,
  onDownloadError,
}) => {
  const handleDownload = async () => {
    const youtubeUrl = `https://www.youtube.com/watch?v=${videoId}`;

    try {
      const response = await fetch(`${import.meta.env.VITE_Hosted_API}/download`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url: youtubeUrl, // Constructed YouTube URL
          path: "./downloads", // Optional: specify a download path
          filename: null, // Optional: specify a filename
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        onDownloadError?.(error.error || "Failed to start download");
        return;
      }

      onDownloadSuccess?.();
      alert("Download started successfully!");
    } catch (error) {
      console.error("Error starting download:", error);
      onDownloadError?.("An error occurred while starting the download.");
    }
  };

  return (
    <button
      onClick={handleDownload}
      className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200"
    >
      <Download className="w-4.5 h-4.5" />
    </button>
  );
};