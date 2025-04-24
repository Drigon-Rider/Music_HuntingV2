# from flask import Flask, request, jsonify, send_file
# from flask_cors import CORS
# from pytube import YouTube
# from flask_jwt_extended import JWTManager, create_access_token, jwt_required
# from pymongo import MongoClient
# import os

# app = Flask(__name__)
# CORS(app)
# app.config['JWT_SECRET_KEY'] = 'super-secret'
# jwt = JWTManager(app)

# client = MongoClient("mongodb://localhost:27017/")
# db = client["mp3_app"]
# users = db["users"]
# downloads = db["downloads"]

# @app.route("/register", methods=["POST"])
# def register():
#     data = request.json
#     if users.find_one({"username": data["username"]}):
#         return jsonify({"error": "User exists"}), 409
#     users.insert_one(data)
#     return jsonify({"message": "Registered"})

# @app.route("/login", methods=["POST"])
# def login():
#     data = request.json
#     user = users.find_one({"username": data["username"], "password": data["password"]})
#     if user:
#         token = create_access_token(identity=data["username"])
#         return jsonify(access_token=token)
#     return jsonify({"error": "Invalid credentials"}), 401

# @app.route("/download", methods=["POST"])
# @jwt_required()
# def download():
#     data = request.json
#     url = data.get("url")
#     yt = YouTube(url)
#     stream = yt.streams.filter(only_audio=True).first()
#     file_path = f"./{yt.title}.mp3"
#     stream.download(filename=file_path)
#     downloads.insert_one({"username": data["username"], "title": yt.title})
#     return send_file(file_path, as_attachment=True)

# @app.route("/history/<username>", methods=["GET"])
# @jwt_required()
# def history(username):
#     history = list(downloads.find({"username": username}, {"_id": 0}))
#     return jsonify(history)

# if __name__ == "__main__":
#     app.run(debug=True)
from flask import Flask

app=Flask(__name__)

@app.route('/hello')
def hello():
    return {'message': ["h1", "h2", "h3"]}

if __name__ == '__main__':
    app.run(debug=True)