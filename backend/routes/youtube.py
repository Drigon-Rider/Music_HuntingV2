from flask import Blueprint, request, jsonify, Response
from youtube_search import YoutubeSearch
from flask import stream_with_context
from yt_dlp import YoutubeDL

search_yt = Blueprint('ytsearch', __name__)

@search_yt.route('/api/ytsearch', methods=['GET'])
def search_music():
    query = request.args.get('query', '')
    if not query:
        return jsonify({"results": []})
    
    results = YoutubeSearch(query, max_results=10).to_dict()
    
    # Prepare detailed results
    detailed_results = []
    for result in results:
        detailed_results.append({
            "id": result.get("id"),
            "thumbnails": result.get("thumbnails"),
            "title": result.get("title"),
            "channel": result.get("channel"),
            "duration": result.get("duration"),
            "views": result.get("views"),
            "url_suffix": result.get("url_suffix")
        })
    
    return jsonify({"results": detailed_results})

@search_yt.route('/api/audio', methods=['GET'])
def get_audio():
    video_id = request.args.get('id')
    if not video_id:
        return jsonify({"error": "Video ID is required"}), 400

    try:
        youtube_url = f"https://www.youtube.com/watch?v={video_id}"
        # yt-dlp options for extracting audio
        ydl_opts = {
            'format': 'bestaudio/best',  # Get the best available audio format
            'quiet': True,              # Suppress yt-dlp logs
            'noplaylist': True          # Ensure only a single video is processed
        }

        with YoutubeDL(ydl_opts) as ydl:
            info = ydl.extract_info(youtube_url, download=False)  # Extract video info
            audio_url = info['url']  # Get the direct audio URL
            return jsonify({"audio_url": audio_url})
    except Exception as e:
        return jsonify({"error": f"Failed to fetch audio stream: {str(e)}"}), 500