import google.generativeai as genai
import os
from dotenv import load_dotenv

load_dotenv()

genai.configure(api_key=os.getenv("AIzaSyCxr3hxbePOD2qgbpjAE3rYEJWhAdUrIy0
"))

model = genai.GenerativeModel("gemini-1.5-flash")

def explain_disease(disease):

    prompt = f"""
You are an agriculture expert.

Explain the plant disease: {disease}

Include:
1. What the disease is
2. Symptoms
3. Causes
4. Treatment
5. Prevention

Explain clearly for farmers.
"""

    response = model.generate_content(prompt)

    return response.text