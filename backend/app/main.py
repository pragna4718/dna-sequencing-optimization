from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api import dna_translation
from app.api import mutation
from app.api import compression

app = FastAPI()

# ✅ CORS (IMPORTANT)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ Routers
app.include_router(dna_translation.router, prefix="/dna")
app.include_router(mutation.router)
app.include_router(compression.router)