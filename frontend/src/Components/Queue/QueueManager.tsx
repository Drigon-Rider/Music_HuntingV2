export interface Track {
  title: string;
  channel: string;
  audio_url: string;
}

export class QueueManager {
  private queue: Track[] = [];
  private previousQueue: Track[] = [];
  private currentTrack: Track | null = null;

  // Add a track to the queue
  addToQueue(track: Track) {
    this.queue.push(track);
  }

  // Get the next track in the queue
  getNextTrack(): Track | null {
    if (this.queue.length > 0) {
      const nextTrack = this.queue.shift()!;
      if (this.currentTrack) {
        this.previousQueue.unshift(this.currentTrack);
      }
      this.currentTrack = nextTrack;
      return nextTrack;
    }
    return null;
  }

  // Get the previous track from the history
  getPreviousTrack(): Track | null {
    if (this.previousQueue.length > 0) {
      const previousTrack = this.previousQueue.shift()!;
      if (this.currentTrack) {
        this.queue.unshift(this.currentTrack);
      }
      this.currentTrack = previousTrack;
      return previousTrack;
    }
    return null;
  }

  // Get the current track
  getCurrentTrack(): Track | null {
    return this.currentTrack;
  }

  // Get the full queue
  getQueue(): Track[] {
    return this.queue;
  }

  // Get the full previous queue
  getPreviousQueue(): Track[] {
    return this.previousQueue;
  }
}