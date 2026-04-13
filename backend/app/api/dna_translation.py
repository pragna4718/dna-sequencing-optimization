from fastapi import APIRouter
from pydantic import BaseModel
from app.algorithms.dna_to_protein import dna_to_amino_acids

router = APIRouter()

class DNARequest(BaseModel):
    sequence: str


@router.post("/translate")
def translate_dna(request: DNARequest):
    result = dna_to_amino_acids(request.sequence)
    return {
        "dna": request.sequence,
        "amino_acids": result,
        "protein_sequence": "-".join(result)
    }