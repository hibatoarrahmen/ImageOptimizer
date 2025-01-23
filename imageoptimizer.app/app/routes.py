import logging
from flask import request, jsonify, send_file
import cv2
import numpy as np
from io import BytesIO
from . import app

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

@app.route('/')
def home():
    return render_template('base.html')

@app.route('/upload', methods=['POST'])
def upload():
    """
    Handle image uploads. Receives an image file from the client, validates its quality and type, compresses it using OpenCV,
    and sends the compressed image back to the client.

    Parameters:
    - request.files['image'] (FileStorage): The image file uploaded by the client.
    - request.form['quality'] (int, optional): The quality for image compression. Default is 90.

    Returns:
    - send_file: A Flask response with the compressed image file as an attachment.
    - jsonify: A JSON response with an error message and appropriate HTTP status code in case of any error.
    """
    try:
        logger.info('Received upload request')

        if 'image' not in request.files:
            logger.error('No image part in the request')
            return jsonify({'error': 'No image part in the request'}), 400

        image_file = request.files['image']
        if image_file.filename == '':
            logger.error('No selected file')
            return jsonify({'error': 'No selected file'}), 400

        # Ensure the uploaded file is an image
        if not image_file.content_type.startswith('image/'):
            logger.error('File is not an image')
            return jsonify({'error': 'File is not an image'}), 400

        # Get the quality parameter from the form data
        quality = request.form.get('quality', type=int, default=90)
        if quality is None or not (0 <= quality <= 100):
            logger.error('Quality must be between 0 and 100')
            return jsonify({'error': 'Quality must be between 0 and 100'}), 400

        # Read the image file
        image_data = image_file.read()
        if not image_data:
            logger.error('Failed to read image file')
            return jsonify({'error': 'Failed to read image file'}), 400

        image = np.frombuffer(image_data, np.uint8)
        image = cv2.imdecode(image, cv2.IMREAD_COLOR)

        if image is None:
            logger.error('Failed to decode image')
            return jsonify({'error': 'Failed to decode image'}), 400

        # Compress the image with OpenCV using the specified quality
        compression_params = [cv2.IMWRITE_JPEG_QUALITY, quality]
        success, buffer = cv2.imencode('.jpg', image, compression_params)
        if not success:
            logger.error('Failed to compress image')
            return jsonify({'error': 'Failed to compress image'}), 500

        compressed_image = BytesIO(buffer)
        logger.info('Image compressed successfully')

        return send_file(compressed_image, mimetype='image/jpeg', as_attachment=True, download_name='compressed_' + image_file.filename)
    except Exception as e:
        logger.error(f'Exception occurred: {str(e)}')
        return jsonify({'error': str(e)}), 500