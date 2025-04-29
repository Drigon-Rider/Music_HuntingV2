// import { useAudio } from "./Audio/AudioContext"

// export const Details = ({ result }: { result: any }) => {
//   const { playTrack, pauseTrack, isPlaying, currentTrack, currentTime, duration, seekTo } = useAudio()

//   // Format time in MM:SS
//   const formatTime = (time: number) => {
//     const minutes = Math.floor(time / 60)
//     const seconds = Math.floor(time % 60)
//     return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`
//   }

//   // Check if this is the current track
//   const isCurrentTrack = currentTrack && currentTrack.id === result.id

//   return (
//     <div className="container mx-auto px-4 py-8 border rounded-md shadow-md bg-white">
//       <h1 className="text-2xl font-bold mb-6">{result.title}</h1>

//       <div className="flex items-center mb-6">
//         {result.thumbnails && result.thumbnails[0] && (
//           <img
//             src={result.thumbnails[0] || "/placeholder.svg"}
//             alt={result.title}
//             className="w-24 h-24 object-cover rounded-md mr-4"
//           />
//         )}

//         <div className="flex-1">
//           <div className="flex items-center space-x-2 mb-2">
//             <button
//               onClick={() => (isCurrentTrack && isPlaying ? pauseTrack() : playTrack(result))}
//               className="w-12 h-12 flex items-center justify-center rounded-full bg-purple-600 text-white hover:bg-purple-700 transition-colors"
//             >
//               {isCurrentTrack && isPlaying ? (
//                 <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
//                   <rect x="6" y="4" width="4" height="16" />
//                   <rect x="14" y="4" width="4" height="16" />
//                 </svg>
//               ) : (
//                 <svg className="w-5 h-5 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
//                   <path d="M8 5v14l11-7z" />
//                 </svg>
//               )}
//           </div>

//           {isCurrentTrack && (
//             <div className="flex items-center space-x-2">
//               <span className="text-xs text-gray-500">{formatTime(currentTime)}</span>
//               <div className="flex-1 relative h-2 bg-gray-200 rounded-full">
//                 <div
//                   className="absolute top-0 left-0 h-full bg-purple-500 rounded-full"
//                   style={{ width: `${(currentTime / duration) * 100}%` }}
//                 ></div>
//                 <input
//                   type="range"
//                   min="0"
//                   max={duration || 0}
//                   value={currentTime}
//                   onChange={(e) => seekTo(Number(e.target.value))}
//                   className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
//                 />
//               </div>
//               <span className="text-xs text-gray-500">{formatTime(duration)}</span>
//             </div>
//           )}
//         </div>
//       </div>

//       <div className="grid grid-cols-2 gap-4 text-sm">
//         <div className="p-3 bg-gray-50 rounded-md">
//           <span className="font-medium text-gray-700">Channel:</span> {result.channel}
//         </div>
//         <div className="p-3 bg-gray-50 rounded-md">
//           <span className="font-medium text-gray-700">Duration:</span> {result.duration}
//         </div>
//         <div className="p-3 bg-gray-50 rounded-md">
//           <span className="font-medium text-gray-700">Views:</span> {result.views}
//         </div>
//       </div>
//     </div>
//   )
// }
