from flask import Blueprint, jsonify, send_from_directory, abort
import os

# Define the blueprint
music_bp = Blueprint('music', __name__)

# Path to the downloads folder
DOWNLOADS_FOLDER = os.path.join(os.path.dirname(os.path.dirname(__file__)), "downloads")

@music_bp.route('/api/music', methods=['GET'])
def list_music():
    """List all music files in the downloads folder."""
    try:
        # Get all files in the downloads folder
        files = [f for f in os.listdir(DOWNLOADS_FOLDER) if os.path.isfile(os.path.join(DOWNLOADS_FOLDER, f))]
        return jsonify({"files": files})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@music_bp.route('/api/music/<filename>', methods=['GET'])
def get_music(filename):
    """Serve a specific music file from the downloads folder."""
    try:
        # Ensure the file exists in the downloads folder
        if filename not in os.listdir(DOWNLOADS_FOLDER):
            abort(404, description="File not found")
        return send_from_directory(DOWNLOADS_FOLDER, filename)
    except Exception as e:
        return jsonify({"error": str(e)}), 500