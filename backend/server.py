import os
from flask import Flask
from flask_cors import CORS
from routes.youtube import search_yt  # Import the search blueprint
from routes.download import download_bp  # Import the new download blueprint
from routes.myfile import music_bp

app = Flask(__name__)

# Allow CORS for the frontend origin
CORS(app, resources={r"/api/*": {"origins": "https://music-hunting-v.vercel.app"}})
#CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})

# Register blueprints
app.register_blueprint(search_yt)
app.register_blueprint(download_bp)
app.register_blueprint(music_bp)

if __name__ == '__main__':
    # Ensure the app runs on the correct port and is publicly accessible
    app.run(host='0.0.0.0', port=5000, debug=False)