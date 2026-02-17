from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pathlib import Path
import uuid
import shutil
import os
from detector import MorphGuardDetector

# Create app FIRST
app = FastAPI(title="MorphGuard AI", version="1.0.0")

# Add CORS IMMEDIATELY after creating app (BEFORE any routes)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

print("\n" + "="*60)
print("🚀 MorphGuard AI - Starting Server")
print("="*60)

UPLOAD_DIR = Path("./uploads")
UPLOAD_DIR.mkdir(exist_ok=True)

print("📦 Loading AI models (first time: 5-10 minutes)...")
try:
    detector = MorphGuardDetector()
    model_loaded = True
    print("✅ Models loaded successfully!")
except Exception as e:
    print(f"❌ Model loading failed: {e}")
    detector = None
    model_loaded = False

print("="*60 + "\n")

@app.get("/")
async def root():
    return {
        "message": "MorphGuard AI API",
        "version": "1.0.0",
        "status": "running",
        "endpoints": {
            "health": "/api/health",
            "detect": "/api/detect (POST)"
        }
    }

@app.get("/api/health")
async def health():
    return {
        "status": "healthy" if model_loaded else "degraded",
        "model_loaded": model_loaded
    }

@app.post("/api/detect")
async def detect_image(file: UploadFile = File(...)):
    print(f"\n{'─'*60}")
    print(f"📥 NEW REQUEST: {file.filename}")
    print(f"   Content-Type: {file.content_type}")
    print(f"   Size: {file.size if hasattr(file, 'size') else 'unknown'} bytes")
    
    # Validate file type
    if not file.content_type or not file.content_type.startswith("image/"):
        print(f"❌ Invalid file type: {file.content_type}")
        raise HTTPException(status_code=400, detail="File must be an image (jpg, png, webp)")
    
    # Check if detector is loaded
    if not detector:
        print("❌ Detector not available")
        raise HTTPException(status_code=503, detail="AI model not loaded")
    
    scan_id = str(uuid.uuid4())
    temp_path = UPLOAD_DIR / f"{scan_id}_{file.filename}"
    
    try:
        # Save file
        print(f"💾 Saving to: {temp_path}")
        with temp_path.open("wb") as f:
            shutil.copyfileobj(file.file, f)
        
        # Analyze
        print(f"🔍 Analyzing image...")
        result = detector.analyze(str(temp_path))
        
        print(f"✅ Analysis complete!")
        print(f"   Decision: {result['decision']}")
        print(f"   Morphing: {result['morphing_score']:.2f}%")
        print(f"   Deepfake: {result['deepfake_score']:.2f}%")
        
        # Format response
        response = {
            "success": True,
            "data": {
                "scan_id": scan_id,
                "morphing_score": result.get('morphing_score', 0.0),
                "deepfake_score": result.get('deepfake_score', 0.0),
                "identity_score": 0,
                "celebrity_match": {
                    "detected": False,
                    "name": None,
                    "confidence": 0
                },
                "decision": result.get('decision', 'ALLOWED'),
                "confidence": result.get('confidence', 0),
                "reasons": result.get('reasons', []),
                "technical_details": result.get('technical', {})
            }
        }
        
        print(f"📤 Sending response")
        print(f"{'─'*60}\n")
        return response
        
    except Exception as e:
        print(f"❌ ERROR during analysis: {str(e)}")
        print(f"{'─'*60}\n")
        raise HTTPException(status_code=500, detail=str(e))
    
    finally:
        # Cleanup
        try:
            if temp_path.exists():
                temp_path.unlink()
                print(f"🗑️  Cleaned up temporary file")
        except Exception as e:
            print(f"⚠️  Cleanup warning: {e}")

# Add OPTIONS handler for CORS preflight
@app.options("/api/detect")
async def options_detect():
    return {"message": "OK"}

if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv('PORT', 8000))
    
    print("\n" + "="*60)
    print(f"🌐 Server starting on http://localhost:{port}")
    print(f"📡 CORS enabled for:")
    print(f"   - http://localhost:5173")
    print(f"   - http://127.0.0.1:5173")
    print("="*60 + "\n")
    
    uvicorn.run(
        app,
        host="0.0.0.0",
        port=port,
        log_level="info"
    )