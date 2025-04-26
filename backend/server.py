import os
from flask import Flask
from flask_cors import CORS
from routes.youtube import search_yt  # Import the search blueprint

app = Flask(__name__)
CORS(app)

# Register blueprints
app.register_blueprint(search_yt)

if __name__ == '__main__':
    # app.run(debug=True)
    port = int(os.environ.get('PORT', 5000))  # Use PORT from environment or default to 5000
    app.run(host='0.0.0.0', port=port)  # Listen on all IPs (publicly accessible)