import os
import sys
from PIL import Image

def compress_image(input_path, output_path, quality=85):
    """
    Compresses an image without significant quality loss.
    """
    try:
        # Open the image
        with Image.open(input_path) as img:
            # Convert to RGB if necessary (rgba to rgb for jpeg)
            if img.mode in ("RGBA", "P"):
                img = img.convert("RGB")
            
            # Ensure directory exists
            os.makedirs(os.path.dirname(output_path), exist_ok=True)
            
            # Save with optimization
            # WebP is generally better for web performance with high quality
            if output_path.lower().endswith('.webp'):
                img.save(output_path, "WEBP", quality=quality, method=6)
            else:
                img.save(output_path, "JPEG", quality=quality, optimize=True)
                
            print(f"Compressed: {input_path} -> {output_path}")
            print(f"Original size: {os.path.getsize(input_path) / 1024:.2f} KB")
            print(f"Compressed size: {os.path.getsize(output_path) / 1024:.2f} KB")
            
    except Exception as e:
        print(f"Error compressing {input_path}: {e}")

if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Usage: python compress.py <input_path> <output_path> [quality]")
        sys.exit(1)
        
    input_p = sys.argv[1]
    output_p = sys.argv[2]
    qual = int(sys.argv[3]) if len(sys.argv) > 3 else 85
    
    compress_image(input_p, output_p, qual)
