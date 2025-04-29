# filepath: c:\Users\LEGION\Documents\GitHub\Music_Hunting\backend\server.py
import os
from flask import Flask
from flask_cors import CORS
from routes.youtube import search_yt  # Import the search blueprint
from routes.download import download_bp  # Import the new download blueprint
from routes.myfile import music_bp

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})

# Register blueprints
app.register_blueprint(search_yt)
app.register_blueprint(download_bp)
app.register_blueprint(music_bp)

if __name__ == '__main__':
    # app.run(debug=True)  # Uncomment for local development
    port = int(os.environ.get('PORT', 5000))  # Use PORT from environment or default to 5000
    app.run(host='0.0.0.0', port=port)  # Listen on all IPs (publicly accessible)