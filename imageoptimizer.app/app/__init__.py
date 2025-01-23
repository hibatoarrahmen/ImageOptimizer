from flask import Flask
from flask_cors import CORS

app = Flask(__name__, instance_relative_config=True)
app.config.from_pyfile('config.py')
app.config['UPLOAD_FOLDER'] = './uploads'

# Enable CORS
CORS(app)

from . import routes