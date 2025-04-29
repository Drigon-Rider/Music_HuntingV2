from flask import Blueprint, request, jsonify, send_from_directory
from .worker import Worker
import logging
import os

logger = logging.getLogger(__name__)

download_bp = Blueprint('download', __name__)

@download_bp.route('/api/download', methods=['POST'])
def download_audio():
    try:
        data = request.json
        link = data.get('url')
        path = data.get('path', './downloads')  # Default download path
        filename = data.get('filename', None)  # Optional filename

        if not link:
            return jsonify({"error": "URL is required"}), 400

        # Create and run the Worker
        worker = Worker(link=link, path=path, filename=filename)
        worker.run()

        return jsonify({"message": "Download started successfully!"}), 200
    except Exception as e:
        logger.error(f"Error in download_audio: {e}")
        return jsonify({"error": str(e)}), 500

@download_bp.route('/api/offline-music', methods=['GET'])
def list_downloaded_music():
    """List all downloaded music files."""
    try:
        downloads_folder = './downloads'
        if not os.path.exists(downloads_folder):
            return jsonify({"files": []})
        files = [
            {"name": f, "path": os.path.join(downloads_folder, f)}
            for f in os.listdir(downloads_folder)
            if os.path.isfile(os.path.join(downloads_folder, f))
        ]
        return jsonify({"files": files}), 200
    except Exception as e:
        logger.error(f"Error in list_downloaded_music: {e}")
        return jsonify({"error": str(e)}), 500

@download_bp.route('/api/offline-music/<filename>', methods=['GET'])
def serve_downloaded_music(filename):
    """Serve a specific downloaded music file."""
    try:
        downloads_folder = './downloads'
        return send_from_directory(downloads_folder, filename)
    except Exception as e:
        logger.error(f"Error in serve_downloaded_music: {e}")
        return jsonify({"error": str(e)}), 500
