import pypdfium2 as pdfium
import os

def convert_pdf_to_images(pdf_path, output_dir):
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)
        
    pdf = pdfium.PdfDocument(pdf_path)
    n_pages = len(pdf)
    
    image_paths = []
    for i in range(n_pages):
        page = pdf[i]
        bitmap = page.render(
            scale=2,  # Increase scale for better resolution
            rotation=0,
        )
        pil_image = bitmap.to_pil()
        image_path = os.path.join(output_dir, f"page_{i+1}.png")
        pil_image.save(image_path)
        image_paths.append(image_path)
        print(f"Saved {image_path}")
        
    return image_paths

if __name__ == "__main__":
    pdf_path = r"c:\Users\dell\Documents\zitrion\gpt\2026 Church Calendar.pdf"
    output_dir = "calendar_images"
    convert_pdf_to_images(pdf_path, output_dir)
