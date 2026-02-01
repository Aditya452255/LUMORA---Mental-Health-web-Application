
  # Mental Health Web App

  

  ## Running the code

  Run `npm i` to install the dependencies.

  Run `npm run dev` to start the development server.
  

## Development (start frontend + server)

To start both the frontend dev server and the server (including the Python chatbot if you use it) with a single command from the repository root:

```powershell
# Install root + server dependencies (run once)
npm install
cd server; npm install

# If you want the Python chatbot, install Python requirements (if present)
# Note: adjust path if your requirements file is located elsewhere
python -m pip install -r server/requirements.txt

# From the repository root, run both frontend and server concurrently
npm run dev:all
```

This runs the frontend dev server and the server's `dev:all` script together using `concurrently`.

If you prefer to run services individually you can also run:

```powershell
# Frontend only
npm run dev

# Server (from `server` folder)
cd server; npm run dev:all
```
