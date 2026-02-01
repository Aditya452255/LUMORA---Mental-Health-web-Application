from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
import google.generativeai as genai
from dotenv import load_dotenv
import os

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
if GEMINI_API_KEY:
    genai.configure(api_key=GEMINI_API_KEY)

# Simple in-memory conversation store (per-process)
conversation_history = {}

SYSTEM_MESSAGE = """
You are a warm, safe, empathetic mental-health support companion.
"""


@app.post("/chat")
async def chat_endpoint(req: Request):
    body = await req.json()
    user_id = body.get("userId", "anon")
    user_msg = body.get("message", "")

    # Ensure history list
    history = conversation_history.setdefault(user_id, [])

    # Append user message
    history.append({"role": "user", "content": user_msg})

    # Build prompt
    prompt = SYSTEM_MESSAGE + "\n"
    for msg in history:
        if msg["role"] == "user":
            prompt += f"User: {msg['content']}\n"
        else:
            prompt += f"Assistant: {msg['content']}\n"
    prompt += "Assistant:"

    try:
        model = genai.GenerativeModel("models/gemini-flash-latest")
        response = model.generate_content(prompt)
        bot_reply = response.text
        history.append({"role": "assistant", "content": bot_reply})
        return {"reply": bot_reply}
    except Exception as e:
        return {"reply": "Sorry, I had trouble responding.", "error": str(e)}
