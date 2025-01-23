# Image Optimizer

Image Optimizer is a web application that allows users to upload images, compress them using OpenCV, and download the compressed images. The application consists of a Flask-based REST API backend and a React-based frontend.

## Features

- Upload images for compression
- Validate uploaded files to ensure they are images
- Compress images using OpenCV with user-specified quality
- Display compressed images directly

## Installation

### Prerequisites

- Python 3.6 or higher
- Node.js and npm
- pip (Python package installer)

### Backend Setup

1. Clone the repository:

   ```sh
   git clone https://github.com/hibatoarrahmen/ImageOptimizer.git
   cd imageoptimizer.app
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

### Frontend Setup

1. Navigate to the frontend directory:

   ```sh
   cd ../imageoptimizer.web
   ```

2. Install the required packages:

   ```sh
   npm install
   ```

3. Start the development server:

   ```sh
   npm run dev
   ```

   The application will be available at `http://localhost:3000/`.

## Development

### Backend

The backend is a Flask application located in the imageoptimizer.app directory. The main entry point is run.py.

### Frontend

The frontend is a React application located in the imageoptimizer.web directory. The main entry point is main.jsx.

### Contributing

Contributions are welcome! Please follow the standard guidelines for contributing to open-source projects.
