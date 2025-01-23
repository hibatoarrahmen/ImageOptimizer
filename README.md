# Image Optimizer

Image Optimizer is a Flask-based REST API that allows users to upload images, compress them using OpenCV, and download the compressed images. This application ensures that only valid image files are processed and allows users to specify the compression quality.

## Features

- Upload images for compression
- Validate uploaded files to ensure they are images
- Compress images using OpenCV with user-specified quality
- Display compressed images directly

## Installation

### Prerequisites

- Python 3.6 or higher
- pip (Python package installer)

### Steps

1. Clone the repository:

   ```sh
   git clone https://github.com/yourusername/image-optimizer.git
   cd image-optimizer
   ```

2. Create a virtual environment:

   ```sh
   python -m venv venv
   ```

3. Activate the virtual environment:

   - On Windows:

     ```sh
     venv\Scripts\activate
     ```

   - On macOS/Linux:

     ```sh
     source venv/bin/activate
     ```

4. Install the required packages:

   ```sh
   pip install -r requirements.txt
   ```

5. Set up the Flask application:

   ```sh
   export FLASK_APP=app
   export FLASK_ENV=development
   ```

   On Windows, use `set` instead of `export`:

   ```sh
   set FLASK_APP=app
   set FLASK_ENV=development
   ```

6. Run the Flask application:

   ```sh
   flask run
   ```

   The application will be available at `http://127.0.0.1:5000/`.

## Usage

### Upload and Compress an Image

Send a POST request to `/upload` with the image file and optional quality parameter.

- **URL**: `/upload`
- **Method**: `POST`
- **Form Data**:
  - `image` (required): The image file to be uploaded.
  - `quality` (optional): The quality for image compression (0-100). Default is 90.

### Example

Using `curl`:

```sh
curl -X POST -F "image=@path/to/your/image.jpg" -F "quality=80" http://127.0.0.1:5000/upload --output compressed_image.jpg
```
