from flask import Blueprint, request, jsonify
from youtube_search import YoutubeSearch

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