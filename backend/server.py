from flask import Flask
from flask_cors import CORS
from routes.youtube import search_yt  # Import the search blueprint

app = Flask(__name__)
CORS(app)

# Register blueprints
app.register_blueprint(search_yt)

if __name__ == '__main__':
    app.run(debug=True)