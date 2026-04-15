from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.optimize import router as optimize_router
from app.api import dna_translation
from app.api import mutation
from app.api import compression

app = FastAPI()

# ✅ CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ Routers (FIXED PREFIXES)
app.include_router(optimize_router, prefix="/optimize")   # 🔥 changed
app.include_router(dna_translation.router, prefix="/dna")
app.include_router(mutation.router, prefix="/mutation")
app.include_router(compression.router, prefix="/compression")