from fastapi import APIRouter
from app.compression.rle import rle_compress

router = APIRouter()

@router.post("/compress")
def compress_api(data: dict):
    sequence = data.get("sequence")

    if not sequence:
        return {"error": "No sequence provided"}

    compressed = rle_compress(sequence)

    return {
        "original": sequence,
        "compressed": compressed,
        "ratio": len(compressed) / len(sequence) if len(sequence) > 0 else 0
    }