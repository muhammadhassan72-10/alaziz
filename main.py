from flask import Flask, jsonify, send_from_directory, redirect, url_for
from flask_cors import CORS
from .routes.auth import auth_bp
from .routes.user import user_bp
import os

app = Flask(__name__, static_folder='../../frontend/school-landing/dist', static_url_path='/')
CORS(app)

# Register blueprints
app.register_blueprint(auth_bp, url_prefix='/api/auth')
app.register_blueprint(user_bp, url_prefix='/api/users')

# Serve React build files for specific panels
@app.route('/student-panel/<path:filename>')
def serve_student_panel(filename):
    return send_from_directory('../../frontend/student-panel/dist', filename)

@app.route('/student-panel/')
def student_panel_root():
    return send_from_directory('../../frontend/student-panel/dist', 'index.html')

@app.route('/teacher-panel/<path:filename>')
def serve_teacher_panel(filename):
    return send_from_directory('../../frontend/teacher-panel/dist', filename)

@app.route('/teacher-panel/')
def teacher_panel_root():
    return send_from_directory('../../frontend/teacher-panel/dist', 'index.html')

@app.route('/parent-panel/<path:filename>')
def serve_parent_panel(filename):
    return send_from_directory('../../frontend/parent-panel/dist', filename)

@app.route('/parent-panel/')
def parent_panel_root():
    return send_from_directory('../../frontend/parent-panel/dist', 'index.html')

# Redirect root to landing page
@app.route('/')
def index():
    return send_from_directory('../../frontend/school-landing/dist', 'index.html')

@app.route('/api/test')
def test_api():
    return jsonify({'message': 'API is working!'})

