import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

class Config:
    SECRET_KEY = os.getenv('SECRET_KEY', 'fallback_secret_key')
    FLASK_ENV = os.getenv('FLASK_ENV', 'development')
    
    # Upload folder configuration
    UPLOAD_FOLDER = os.path.join('static', 'certificates')
    
    # Allowed certificate file extensions
    ALLOWED_EXTENSIONS = {'.png', '.jpg', '.jpeg', '.pdf'}
    
    DEBUG = False

class DevelopmentConfig(Config):
    DEBUG = True

class ProductionConfig(Config):
    DEBUG = False