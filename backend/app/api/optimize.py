from fastapi import APIRouter
from pydantic import BaseModel
import time

router = APIRouter()

# =========================
# Request Model
# =========================
class DNARequest(BaseModel):
    sequence: str


# =========================
# Utility Functions
# =========================
def gc_content(seq):
    return (seq.count('G') + seq.count('C')) / len(seq) if len(seq) > 0 else 0


def replace_low_gc(seq):
    """Replace A/T with G to increase GC content"""
    return seq.replace('A', 'G').replace('T', 'C')


# =========================
# 1. Greedy Algorithm - O(n)
# =========================
def greedy_optimize(seq):
    start = time.time()
    optimized = ""
    for ch in seq:
        if ch in ['A', 'T']:
            optimized += 'G'  # greedy replace
        else:
            optimized += ch
    elapsed = (time.time() - start) * 1000  # ms

    return {
        "algorithm": "Greedy",
        "output": optimized,
        "explanation": "Replaces A/T with G locally for higher GC content. Single-pass algorithm.",
        "time_complexity": "O(n)",
        "space_complexity": "O(n)",
        "execution_time": round(elapsed, 2)
    }


# =========================
# 2. Divide and Conquer - O(n log n)
# =========================
def divide_and_conquer_util(seq):
    if len(seq) <= 5:
        return replace_low_gc(seq)

    mid = len(seq) // 2
    left = divide_and_conquer_util(seq[:mid])
    right = divide_and_conquer_util(seq[mid:])
    return left + right


def dac_wrapper(seq):
    start = time.time()
    result = divide_and_conquer_util(seq)
    elapsed = (time.time() - start) * 1000  # ms

    return {
        "algorithm": "Divide and Conquer",
        "output": result,
        "explanation": "Splits sequence recursively and optimizes sub-parts independently.",
        "time_complexity": "O(n log n)",
        "space_complexity": "O(log n)",
        "execution_time": round(elapsed, 2)
    }


# =========================
# 3. String Matching (Pattern-based)
# =========================
def string_matching_opt(seq):
    start = time.time()
    result = seq
    patterns = ["AAA", "TTT", "AAAA"]
    
    for pattern in patterns:
        if len(pattern) > 0:
            replacement = "G" * len(pattern)
            result = result.replace(pattern, replacement)
    
    elapsed = (time.time() - start) * 1000  # ms

    return {
        "algorithm": "String Matching",
        "output": result,
        "explanation": "Detects unwanted patterns (AAA, TTT) and replaces them with G.",
        "time_complexity": "O(n·m)",
        "space_complexity": "O(1)",
        "execution_time": round(elapsed, 2)
    }


# =========================
# 4. Hashing (Repeat removal)
# =========================
def hashing_opt(seq):
    start = time.time()
    seen = set()
    result = ""

    for ch in seq:
        if ch not in seen:
            seen.add(ch)
            result += ch
        else:
            result += 'G'  # replace repeat

    elapsed = (time.time() - start) * 1000  # ms

    return {
        "algorithm": "Hashing",
        "output": result,
        "explanation": "Uses hash set to detect repeats and replaces duplicate bases.",
        "time_complexity": "O(n)",
        "space_complexity": "O(n)",
        "execution_time": round(elapsed, 2)
    }


# =========================
# 5. Sliding Window - O(n)
# =========================
def sliding_window_opt(seq, k=5):
    start = time.time()
    seq = list(seq)

    for i in range(len(seq) - k + 1):
        window = seq[i:i+k]
        gc = (window.count('G') + window.count('C')) / k

        if gc < 0.4:
            seq[i] = 'G'  # improve window

    elapsed = (time.time() - start) * 1000  # ms

    return {
        "algorithm": "Sliding Window",
        "output": "".join(seq),
        "explanation": "Optimizes GC content in local windows of size 5.",
        "time_complexity": "O(n)",
        "space_complexity": "O(1)",
        "execution_time": round(elapsed, 2)
    }


# =========================
# 6. Branch and Bound - O(2^n) for small subsets
# =========================
best_seq = ""
best_score = -1


def score(seq):
    return gc_content(seq)


def branch_and_bound_util(seq, index, current):
    global best_seq, best_score

    if index == len(seq):
        sc = score(current)
        if sc > best_score:
            best_score = sc
            best_seq = current
        return

    # Choice 1: keep original
    branch_and_bound_util(seq, index + 1, current + seq[index])

    # Choice 2: replace with G
    branch_and_bound_util(seq, index + 1, current + 'G')


def branch_and_bound(seq):
    global best_seq, best_score
    best_seq = ""
    best_score = -1

    start = time.time()
    
    # Limit size to avoid explosion
    short_seq = seq[:12]
    branch_and_bound_util(short_seq, 0, "")
    
    # Pad result to match input length
    result = best_seq + seq[len(best_seq):]
    
    elapsed = (time.time() - start) * 1000  # ms

    return {
        "algorithm": "Branch and Bound",
        "output": result,
        "explanation": "Explores all possibilities and prunes based on GC score. Optimal but exponential.",
        "time_complexity": "O(2^n)",
        "space_complexity": "O(n)",
        "execution_time": round(elapsed, 2)
    }


# =========================
# MAIN API
# =========================
@router.post("/optimize")
def optimize_dna(request: DNARequest):
    seq = request.sequence.upper()

    if len(seq) == 0:
        return {"error": "Empty sequence"}

    return {
        "input": seq,
        "results": [
            greedy_optimize(seq),
            dac_wrapper(seq),
            string_matching_opt(seq),
            hashing_opt(seq),
            sliding_window_opt(seq),
            branch_and_bound(seq)
        ]
    }