import subprocess as sp
import sys
import logging
import os

logger = logging.getLogger(__name__)

class Worker:
    def __init__(self, link, path, filename=None):
        self.link = link
        self.path = path
        self.filename = filename

    def build_command(self):
        ffmpeg_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), "bin", "ffmpeg.exe")  # Adjust path to ffmpeg.exe
        output_template = f"{self.path}/{self.filename}" if self.filename else f"{self.path}/%(title)s.%(ext)s"
        return [
            "yt-dlp",
            "--extract-audio",
            "--audio-format", "mp3",
            "--audio-quality", "0",
            "--ffmpeg-location", ffmpeg_path,  # Use the local ffmpeg.exe
            "-o", output_template,
            self.link,
        ]

    def run(self):
        command = self.build_command()
        try:
            logger.info(f"Starting download with command: {' '.join(command)}")
            sp.run(command, check=True, stdout=sp.PIPE, stderr=sp.PIPE, text=True)
            logger.info("Download completed successfully.")
        except sp.CalledProcessError as e:
            logger.error(f"Error during download: {e.stderr}")
            raise Exception("Download failed.")