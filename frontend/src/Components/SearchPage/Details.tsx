import { DownloadButton } from "./Downloadbutton";

export const Details = ({ result }: { result: any }) => {
  const videoUrl = `https://www.youtube.com/embed/${result.id}`;

  return (
    <div className="container mx-auto px-4 py-8 border rounded-md shadow-md">
      <h1 className="text-3xl font-bold mb-8">{result.title}</h1>
      <div className="aspect-w-16 aspect-h-9">
        <iframe
          src={videoUrl}
          title={result.title}
          className="w-full h-64 rounded-md"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
      <p className="mt-4 text-gray-700">
        <strong>Channel:</strong> {result.channel}
      </p>
      <p className="text-gray-700">
        <strong>Duration:</strong> {result.duration}
      </p>
      <p className="text-gray-700">
        <strong>Views:</strong> {result.views}
      </p>
      {/* Use the DownloadButton component */}
      <DownloadButton result={result} />
    </div>
  );
};