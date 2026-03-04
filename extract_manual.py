import pdfplumber

def extract_manual_data(pdf_path):
    all_text = ""
    with pdfplumber.open(pdf_path) as pdf:
        for i, page in enumerate(pdf.pages):
            all_text += f"\n--- Page {i+1} ---\n"
            text = page.extract_text()
            if text:
                all_text += text
                
    return all_text

if __name__ == "__main__":
    pdf_path = r"c:\Users\dell\Documents\zitrion\gpt\Membership Manual 2026 Rev (Soft) [LIGHT].pdf"
    text = extract_manual_data(pdf_path)
    
    with open("manual_text.txt", "w", encoding="utf-8") as f:
        f.write(text)
        
    print("Extraction complete. Text saved to manual_text.txt.")
