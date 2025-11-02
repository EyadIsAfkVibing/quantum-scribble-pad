# Backend Setup Guide

This project connects to a Python FastAPI backend with Ollama for AI-powered features.

## Prerequisites

1. **Python 3.9+** installed
2. **Ollama** installed and running
3. **FastAPI** and dependencies

## Quick Start

### 1. Install Ollama

```bash
# macOS / Linux
curl https://ollama.ai/install.sh | sh

# Windows
# Download from https://ollama.ai/download
```

### 2. Pull an AI Model

```bash
# Recommended: Mistral (fast and capable)
ollama pull mistral

# Or try others:
# ollama pull llama2
# ollama pull codellama
```

### 3. Start Ollama Server

```bash
ollama serve
```

Keep this running in a separate terminal.

### 4. Create Python Backend

Create a `backend/` directory and add `main.py`:

```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import httpx

app = FastAPI()

# Enable CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatRequest(BaseModel):
    message: str
    history: list = []

class MathRequest(BaseModel):
    expression: str
    type: str = "general"

class CodeRequest(BaseModel):
    code: str
    language: str
    action: str

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

@app.post("/api/chat")
async def chat(request: ChatRequest):
    async with httpx.AsyncClient() as client:
        response = await client.post(
            "http://localhost:11434/api/generate",
            json={
                "model": "mistral",
                "prompt": request.message,
                "stream": False
            }
        )
        data = response.json()
        return {"response": data.get("response", "")}

@app.post("/api/solve")
async def solve_math(request: MathRequest):
    async with httpx.AsyncClient() as client:
        prompt = f"Solve this math problem step by step: {request.expression}"
        response = await client.post(
            "http://localhost:11434/api/generate",
            json={
                "model": "mistral",
                "prompt": prompt,
                "stream": False
            }
        )
        data = response.json()
        return {
            "response": data.get("response", ""),
            "solution": data.get("response", "")
        }

@app.post("/api/code-assist")
async def code_assist(request: CodeRequest):
    async with httpx.AsyncClient() as client:
        prompt = f"{request.action.capitalize()} this {request.language} code:\n\n{request.code}"
        response = await client.post(
            "http://localhost:11434/api/generate",
            json={
                "model": "mistral",
                "prompt": prompt,
                "stream": False
            }
        )
        data = response.json()
        return {"response": data.get("response", "")}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8080)
```

### 5. Install Python Dependencies

```bash
cd backend
pip install fastapi uvicorn httpx pydantic
```

### 6. Start the Backend Server

```bash
python main.py
```

Server will run at `http://localhost:8080`

## Testing the Backend

### Test Health Check

```bash
curl http://localhost:8080/health
```

### Test Chat Endpoint

```bash
curl -X POST http://localhost:8080/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Explain recursion in simple terms"}'
```

### Test Math Solver

```bash
curl -X POST http://localhost:8080/api/solve \
  -H "Content-Type: application/json" \
  -d '{"expression": "3x + 5 = 20", "type": "linear"}'
```

## Frontend Configuration

The frontend is already configured to connect to `http://localhost:8080`. 

Check `src/services/api.ts` for API endpoints.

## Troubleshooting

### Backend Not Connecting

1. Ensure Ollama is running: `ollama serve`
2. Check FastAPI is running on port 8080
3. Verify CORS is enabled in `main.py`
4. Check browser console for network errors

### Ollama Model Issues

```bash
# List installed models
ollama list

# Pull a model if missing
ollama pull mistral

# Test model directly
ollama run mistral "Hello, world!"
```

### Port Already in Use

Change the port in both:
- `backend/main.py`: `uvicorn.run(app, port=8081)`
- `src/services/api.ts`: `const API_BASE_URL = 'http://localhost:8081'`

## Available API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/health` | GET | Health check |
| `/api/chat` | POST | General AI chat |
| `/api/solve` | POST | Math problem solving |
| `/api/code-assist` | POST | Code debugging/explanation |

## Using Different Models

Edit `main.py` and change the model name:

```python
"model": "mistral",  # Change to: llama2, codellama, etc.
```

## Production Deployment

For production:
1. Add authentication
2. Use environment variables for configuration
3. Deploy FastAPI with gunicorn + uvicorn workers
4. Use a reverse proxy (nginx)
5. Enable HTTPS

## Resources

- [Ollama Documentation](https://github.com/ollama/ollama)
- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [Quantum Pad Repository](https://github.com/yourusername/quantum-pad)
