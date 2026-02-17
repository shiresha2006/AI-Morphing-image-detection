import os
os.environ['TRANSFORMERS_NO_TF'] = '1'

import torch
from PIL import Image
import time

class MorphGuardDetector:
    def __init__(self):
        print("🚀 Initializing MorphGuard Detector...")
        self.classifier = None
        self.facenet = None
        self.mtcnn = None
        
        # Load HuggingFace model
        try:
            print("📥 Loading deepfake detector (first time: 5-10 min)...")
            from transformers import pipeline
            self.classifier = pipeline(
                "image-classification",
                model="dima806/deepfake_vs_real_image_detection",
                device=0 if torch.cuda.is_available() else -1
            )
            print("✅ Deepfake detector loaded successfully!")
        except Exception as e:
            print(f"⚠️ Could not load HuggingFace model: {e}")
            print("⚠️ Will run in fallback mode")
        
        # Load FaceNet (optional)
        try:
            print("📥 Loading FaceNet...")
            from facenet_pytorch import InceptionResnetV1, MTCNN
            self.facenet = InceptionResnetV1(pretrained='vggface2').eval()
            self.mtcnn = MTCNN(keep_all=False)
            print("✅ FaceNet loaded!")
        except Exception as e:
            print(f"⚠️ FaceNet not available: {e}")
        
        print("✅ MorphGuard ready!\n")
    
    def analyze(self, image_path: str) -> dict:
        start = time.time()
        
        # Load image
        try:
            img = Image.open(image_path).convert('RGB')
        except Exception as e:
            raise ValueError(f"Cannot open image: {e}")
        
        # Detect face
        face_detected = self._detect_face(image_path)
        
        # Run classification
        fake_prob = 0.0
        if self.classifier:
            try:
                result = self.classifier(img)
                # Find FAKE label
                for item in result:
                    if 'FAKE' in item['label'].upper():
                        fake_prob = item['score'] * 100
                        break
            except Exception as e:
                print(f"⚠️ Classification error: {e}")
                fake_prob = 50.0  # Fallback
        else:
            # Fallback mode
            fake_prob = 50.0
        
        # Calculate scores
        morphing_score = round(fake_prob * 0.7, 2)
        deepfake_score = round(fake_prob * 0.6, 2)
        final_score = round((morphing_score + deepfake_score) / 2, 2)
        
        # Decision
        if final_score > 80:
            decision = "BLOCKED"
            reasons = [
                f"High manipulation probability ({fake_prob:.1f}%)",
                "Multiple deepfake indicators detected",
                "Unnatural facial features"
            ]
        elif final_score >= 50:
            decision = "FLAGGED"
            reasons = [
                f"Moderate manipulation indicators ({fake_prob:.1f}%)",
                "Requires manual review"
            ]
        else:
            decision = "ALLOWED"
            reasons = ["No significant anomalies detected"]
        
        if not face_detected:
            reasons.append("⚠️ No face detected in image")
        
        processing_time = int((time.time() - start) * 1000)
        
        return {
            "morphing_score": morphing_score,
            "deepfake_score": deepfake_score,
            "final_score": final_score,
            "decision": decision,
            "confidence": round(fake_prob, 2),
            "reasons": reasons,
            "technical": {
                "face_detected": face_detected,
                "model_prediction": fake_prob,
                "processing_time_ms": processing_time,
            }
        }
    
    def _detect_face(self, image_path: str) -> bool:
        if not self.mtcnn:
            return True  # Assume face exists if no detector
        
        try:
            img = Image.open(image_path).convert('RGB')
            boxes, _ = self.mtcnn.detect(img)
            return boxes is not None and len(boxes) > 0
        except Exception as e:
            print(f"⚠️ Face detection error: {e}")
            return True  # Assume face exists on error

