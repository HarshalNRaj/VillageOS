from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api import krishi_ai, scheme_ai, voice_ai

app = FastAPI(
    title="VillageOS Lite API",
    description="Backend services for VillageOS Lite platform",
    version="1.0.0"
)

# Allow CORS for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(krishi_ai.router, prefix="/api/krishi", tags=["Krishi AI"])
app.include_router(scheme_ai.router, prefix="/api/scheme", tags=["Scheme AI"])
app.include_router(voice_ai.router, prefix="/api/voice", tags=["Voice AI"])

@app.get("/")
async def root():
    return {"message": "Welcome to VillageOS Lite API. Go to /docs for Swagger documentation."}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
