import os
import google.generativeai as genai
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Configure the Gemini API
api_key = os.getenv("GEMINI_API_KEY")
if not api_key:
    raise ValueError("GEMINI_API_KEY is not set in the .env file")

genai.configure(api_key=api_key)

# The model to use
model = genai.GenerativeModel('gemini-1.5-flash')

def get_agriculture_advice(prompt):
    """
    Get advice from the Gemini Agriculture Assistant
    """
    system_prompt = "You are an expert agriculture AI assistant. Provide helpful, accurate, and concise advice directly related to farming, crop health, pest control, and plant diseases. Respond in a friendly, professional tone."
    
    full_prompt = f"{system_prompt}\n\nUser Question: {prompt}"
    
    try:
        response = model.generate_content(full_prompt)
        return response.text
    except Exception as e:
        return f"Error connecting to AI Assistant: {str(e)}"

if __name__ == "__main__":
    # Test the assistant
    print("Testing Agri AI...")
    test_response = get_agriculture_advice("What are the early signs of tomato blight?")
    print(f"\nResponse:\n{test_response}")
