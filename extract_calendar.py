import pdfplumber
import json

def extract_calendar_data(pdf_path):
    all_text = ""
    tables_data = []
    
    with pdfplumber.open(pdf_path) as pdf:
        for i, page in enumerate(pdf.pages):
            all_text += f"\n--- Page {i+1} ---\n"
            all_text += page.extract_text()
            
            tables = page.extract_tables()
            for j, table in enumerate(tables):
                tables_data.append({
                    "page": i + 1,
                    "table_index": j + 1,
                    "rows": table
                })
                
    return all_text, tables_data

if __name__ == "__main__":
    pdf_path = r"c:\Users\dell\Documents\zitrion\gpt\2026 Church Calendar.pdf"
    text, tables = extract_calendar_data(pdf_path)
    
    with open("calendar_text.txt", "w", encoding="utf-8") as f:
        f.write(text)
        
    with open("calendar_tables.json", "w", encoding="utf-8") as f:
        json.dump(tables, f, indent=2, ensure_ascii=False)
        
    print("Extraction complete. Text saved to calendar_text.txt and tables to calendar_tables.json.")
