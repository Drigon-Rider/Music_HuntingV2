import { createContext, useContext } from "react";
import { useAudio } from "../SearchPage/Audio/AudioContext";
import { QueueManager, Track } from "./QueueManager"; // Import QueueManager and Track interface

const QueueContext = createContext<any>(null);

const queueManager = new QueueManager(); // Create an instance of QueueManager

export const QueueProvider = ({ children }: any) => {
  const { playTrack } = useAudio();

  // Add a track to the queue
  const addToQueue = (track: Track) => {
    queueManager.addToQueue(track);
  };

  // Play the next track in the queue
  const playNext = () => {
    const nextTrack = queueManager.getNextTrack();
    if (nextTrack) {
      playTrack(nextTrack); // Play the next track
    }
  };

  // Play the previous track from the history
  const playPrevious = () => {
    const previousTrack = queueManager.getPreviousTrack();
    if (previousTrack) {
      playTrack(previousTrack); // Play the previous track
    }
  };

  // Get the current track
  const getCurrentTrack = () => queueManager.getCurrentTrack();

  // Get the full queue
  const getQueue = () => queueManager.getQueue();

  return (
    <QueueContext.Provider
      value={{
        addToQueue,
        playNext,
        playPrevious,
        getCurrentTrack,
        getQueue,
      }}
    >
      {children}
    </QueueContext.Provider>
  );
};

export const useQueue = () => useContext(QueueContext);