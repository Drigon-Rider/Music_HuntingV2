import type React from "react"
import { Download } from "lucide-react"

interface DownloadButtonProps {
  result: any
}

export const DownloadButton: React.FC<DownloadButtonProps> = ({ result }) => {
  const handleDownload = () => {
    alert(`Download functionality for "${result.id}" coming soon!`)
  }

  return (
    <button
      onClick={handleDownload}
      className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200"
    >
      <Download className="w-4.5 h-4.5" result={result} />
    </button>
  )
}
