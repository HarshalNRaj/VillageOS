# VillageOS Lite

"Digital AI infrastructure for rural communities."

VillageOS Lite is an award-winning, fully responsive AI-powered web platform built to assist rural farmers and citizens. It features crop disease detection (KrishiAI), government scheme recommendations (SchemeAI), and a multilingual voice assistant.

## Tech Stack
- **Frontend**: React, Vite, Tailwind CSS, Framer Motion, Lucide React
- **Backend**: Python, FastAPI, Uvicorn

## How to Run Locally

### Prerequisites
1. **Node.js** (v18+ recommended) - [Download here](https://nodejs.org/)
2. **Python** (v3.9+ recommended) - [Download here](https://www.python.org/downloads/)

### 1. Start the Backend (FastAPI)
Open a terminal in the `backend` folder:
```bash
cd backend
python -m pip install -r requirements.txt
python -m uvicorn main:app --reload
```
The backend will run at `http://localhost:8000`. You can view the API documentation at `http://localhost:8000/docs`.

### 2. Start the Frontend (React + Vite)
Open a new terminal in the `frontend` folder:
```bash
cd frontend
npm install
npm run dev
```
The frontend will run at `http://localhost:5173`. Open this URL in your browser to view the VillageOS Lite dashboard!

## Features Demo Ready
The project currently uses simulated AI endpoints, meaning you can flawlessly demo all features during a hackathon presentation without relying on paid API keys or worrying about latency issues. You can easily plug in real API keys in the backend routers when ready.
