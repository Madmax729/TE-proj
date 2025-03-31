import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    # MongoDB Atlas configuration with database name
    MONGODB_URI = os.getenv("MONGODB_URI", "mongodb+srv://sohamrc08:teminiproj@cluster0.2eiyfxv.mongodb.net/community_chat?retryWrites=true&w=majority&appName=Cluster0")
    
    # JWT configuration
    JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY", "eb07630eaeff81a2577588bfe67aad9f5e03292115d68e9b54b9c0f9838dda5f13b7095a939f970ef2942861a2795cccd8cb43371ffa747920df1597b82233c86359953c238393775ff0323edac033537631f42d981bd222c5e706fe9a439743fa8281d57732ba044fd48c2bbfc7a6ceacc30e030d663551c4ee3141fd78b9313907f884b1e421c73b058370e6828fef097a5cc03f26d8c2c6b7d95cbf0b9c7ccffcd54a40ecc1034974aaac146c353b673a6c015aba8b365e9cb5895d072641e39f2bf03306c2fa31a2d203b68f5a1a4ae9a847287554b79ff4d4ef10bc47d3dcadeb9a6c1f8c7de2cbbb2a16131ea0cba673e8cfabb4c9db2519bdfd39d915")
    JWT_ACCESS_TOKEN_EXPIRES = 3600  # 1 hour (in seconds)
    
    # Flask configuration
    DEBUG = os.getenv("DEBUG", "True").lower() == "true"
    PORT = int(os.getenv("PORT", "5000"))
    HOST = os.getenv("HOST", "0.0.0.0")