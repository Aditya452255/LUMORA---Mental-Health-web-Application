# Auth backend for Mental Health Web App 2

Quick instructions to run the local auth server (signup / login) that uses MongoDB.

Prerequisites
- Node.js 16+ and `npm` installed.
- A MongoDB connection string (Atlas or local). See `.env.example`.

Setup
1. Open a terminal and change into the `server` folder:

   ```powershell
   cd "c:/Users/hp/Desktop/class 12 material/Mental Health Web App 2/Mental Health Web App 2/server"
   ```

2. Install dependencies:

   ```powershell
   npm install
   ```

3. Create a `.env` file in `server/` (or set env vars). Example values are in `.env.example`.

   If you already have the root `.env` with `MONGO_URI` and `JWT_SECRET`, you can copy it:

   ```powershell
   Copy-Item ..\.env .\.env
   ```

Run
- Development (auto-restart):

  ```powershell
  npm run dev
  ```

- Production:

  ```powershell
  npm start
  ```

API
- POST `/api/auth/signup` — body: `{ name, email, password }` — returns `{ token, user }` on success.
- POST `/api/auth/login` — body: `{ email, password }` — returns `{ token, user }` on success.

Notes
- The server uses `MONGO_URI` and `JWT_SECRET` from environment. Keep secrets safe.
- To connect your frontend, call endpoints at `http://localhost:5000/api/auth/...` by default.

Chatbot (FastAPI) notes
- The project includes a Python FastAPI chatbot at `server/chatbot_app.py` that uses the Gemini API key from `server/.env` (environment variable `GEMINI_API_KEY`).
- To run the chatbot service locally:

   ```powershell
   cd "c:/Users/hp/Desktop/class 12 material/Mental Health Web App 2/Mental Health Web App 2/server"
   # install python deps (only required once)
   python -m pip install -r requirements.txt
   # run FastAPI (chat) server
   python -m uvicorn chatbot_app:app --port 8000
   ```

- The Node backend exposes a proxy at `POST /api/chat` which forwards requests to the Python service. Start the Node backend as usual (in a separate terminal):

   ```powershell
   npm run dev
   ```

- Frontend configuration: make sure `VITE_API_URL` points to your Node backend (default `http://localhost:5000`). The frontend Chatbot now posts to `${VITE_API_URL}/api/chat`.

Note: I added an npm script `npm run chat` in the `server/` folder to run the Python chat server (requires Python and `uvicorn` installed). Running both services requires two shells or a process manager.

One-command starter
 - You can start both the Python FastAPI chatbot and the Node backend with a single command from the `server/` folder:

    ```powershell
    cd "c:/Users/hp/Desktop/class 12 material/Mental Health Web App 2/Mental Health Web App 2/server"
    npm install
    npm run dev:all
    ```

 - This uses `concurrently` to run `npm run chat` (Python/uvicorn) and `npm run dev` (nodemon) together. Keep in mind you still need Python and the Python dependencies installed for the chat server to run properly.


