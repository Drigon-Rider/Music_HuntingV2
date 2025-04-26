from flask import Blueprint, request, jsonify
from youtube_search import YoutubeSearch

search_yt = Blueprint('ytsearch', __name__)

@search_yt.route('/api/ytsearch', methods=['GET'])
def search_music():
    query = request.args.get('query', '')
    if not query:
        return jsonify({"results": []})
    
    results = YoutubeSearch(query, max_results=10).to_dict()
    return jsonify({"results": [result['title'] for result in results]})