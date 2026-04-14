from fastapi import APIRouter
from app.algorithms.mutation_logic import detect_mutation, calculate_similarity

router = APIRouter()

@router.post("/mutation")
def mutation_api(data: dict):
    try:
        seq1 = data.get("seq1")
        seq2 = data.get("seq2")

        if not seq1 or not seq2:
            return {"error": "Both sequences required"}

        # DEBUG PRINT
        print("SEQ1:", seq1)
        print("SEQ2:", seq2)

        result = detect_mutation(seq1, seq2)

        # HANDLE DIFFERENT RETURNS SAFELY
        if len(result) == 3:
            distance, operations, steps = result
        elif len(result) == 2:
            distance, operations = result
            steps = []
        else:
            return {"error": "Unexpected return from detect_mutation"}

        similarity = calculate_similarity(seq1, seq2)

        return {
            "distance": distance,
            "similarity": similarity,
            "operations": operations
        }

    except Exception as e:
        print("ERROR:", str(e))   # 🔥 THIS WILL SHOW REAL ISSUE
        return {"error": str(e)}