import pdfplumber
import os
import json

def extract_text_from_pdfs(folder_path):
    results = []
    for filename in os.listdir(folder_path):
        if filename.endswith(".pdf"):
            file_path = os.path.join(folder_path, filename)
            print(f"Extracting {filename}...")
            content = ""
            with pdfplumber.open(file_path) as pdf:
                for page in pdf.pages:
                    text = page.extract_text()
                    if text:
                        content += text + "\n"
            results.append({
                "filename": filename,
                "content": content
            })
    return results

if __name__ == "__main__":
    blogs_folder = r"c:\Users\dell\Documents\zitrion\gpt\blogs"
    output_file = r"c:\Users\dell\Documents\zitrion\gpt\gpthebroncity\blogs_extracted.json"
    
    data = extract_text_from_pdfs(blogs_folder)
    with open(output_file, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
    print(f"Extraction complete. Data saved to {output_file}")
