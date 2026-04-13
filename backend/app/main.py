from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import dna_translation

app = FastAPI()   # ✅ FIRST create app

# ✅ Add CORS middleware to allow frontend requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins (adjust for production)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ THEN include router
app.include_router(dna_translation.router, prefix="/dna", tags=["DNA"])