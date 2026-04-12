from mutation_logic import detect_mutation, calculate_similarity
from view import generate_alignment_html

def is_valid_dna(seq):
    return all(c in "ATGC" for c in seq)

def main():
    seq1 = input("Enter Original DNA Sequence: ").upper()
    seq2 = input("Enter Target DNA Sequence  : ").upper()

    if not is_valid_dna(seq1) or not is_valid_dna(seq2):
        print("❌ Invalid DNA sequence! Use only A, T, G, C.")
        return

    distance, operations = detect_mutation(seq1, seq2)
    similarity = calculate_similarity(seq1, seq2)

    print("\n" + "="*45)
    print("🧬 DNA MUTATION ANALYSIS")
    print("="*45)

    print(f"\nOriginal Sequence : {seq1}")
    print(f"Target Sequence   : {seq2}")

    print(f"\n🔍 Minimum Mutations Required: {distance}")

    print("\n🧾 Operations:")
    if not operations:
        print("No mutations (Sequences are identical)")
    else:
        for i, op in enumerate(operations, 1):
            typ, pos, old, new = op
            print(f"{i}. {typ} at position {pos}: {old} → {new}")

    sub = sum(1 for op in operations if op[0] == "Substitution")
    ins = sum(1 for op in operations if op[0] == "Insertion")
    dele = sum(1 for op in operations if op[0] == "Deletion")

    print("\n📊 Mutation Breakdown:")
    print(f"Substitutions: {sub}")
    print(f"Insertions   : {ins}")
    print(f"Deletions    : {dele}")

    print(f"\n📈 Similarity: {similarity:.2f}%")

    print("\n" + "="*45)

    # Visualization
    generate_alignment_html(seq1, seq2, operations)


if __name__ == "__main__":
    main()