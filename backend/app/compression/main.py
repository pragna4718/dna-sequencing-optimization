from rle import rle_compress, rle_decompress, compression_analysis

def is_valid_dna(seq):
    return all(c in "ATGC" for c in seq)

def print_pattern_analysis(compressed):
    print("\n🔍 Pattern Analysis:")
    i = 0
    while i < len(compressed):
        char = compressed[i]
        i += 1

        num = ""
        while i < len(compressed) and compressed[i].isdigit():
            num += compressed[i]
            i += 1

        print(f"{char} → repeated {num} times")

def print_efficiency_bar(ratio):
    bar = int(ratio // 5)  # scale to 20 blocks
    print("\n📊 Efficiency Bar:")
    print("[" + "█"*bar + "░"*(20-bar) + "]")

def print_efficiency_message(ratio):
    print("\n📈 Efficiency Interpretation:")
    if ratio > 50:
        print("🔥 Excellent compression (very high repetition)")
    elif ratio > 20:
        print("👍 Good compression (moderate repetition)")
    elif ratio > 0:
        print("⚠️ Low compression (less repetition)")
    else:
        print("❌ No compression benefit")

def main():
    seq = input("Enter DNA Sequence: ").upper()

    if not is_valid_dna(seq):
        print("❌ Invalid DNA sequence! Use only A, T, G, C.")
        return

    compressed = rle_compress(seq)
    decompressed = rle_decompress(compressed)

    original_size, compressed_size, ratio = compression_analysis(seq, compressed)

    saved = original_size - compressed_size

    print("\n" + "="*50)
    print("🧬 DNA COMPRESSION ANALYSIS")
    print("="*50)

    print(f"\nOriginal Sequence : {seq}")
    print(f"Compressed        : {compressed}")
    print(f"Decompressed      : {decompressed}")

    print("\n📊 Statistics:")
    print(f"Original Size   : {original_size}")
    print(f"Compressed Size : {compressed_size}")
    print(f"Saved Characters: {saved}")

    print(f"\n📈 Compression Gain: {ratio:.2f}%")

    # Efficiency message
    print_efficiency_message(ratio)

    # Pattern breakdown
    print_pattern_analysis(compressed)

    # Visual bar
    print_efficiency_bar(ratio)

    # Compression failure case
    if compressed_size >= original_size:
        print("\n⚠️ Compression not effective for this sequence")

    print("\n" + "="*50)


if __name__ == "__main__":
    main()