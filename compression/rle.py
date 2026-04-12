def rle_compress(sequence):
    if not sequence:
        return ""

    compressed = ""
    count = 1

    for i in range(1, len(sequence)):
        if sequence[i] == sequence[i - 1]:
            count += 1
        else:
            compressed += sequence[i - 1] + str(count)
            count = 1

    compressed += sequence[-1] + str(count)

    return compressed


def rle_decompress(compressed):
    decompressed = ""
    i = 0

    while i < len(compressed):
        char = compressed[i]
        i += 1

        num = ""
        while i < len(compressed) and compressed[i].isdigit():
            num += compressed[i]
            i += 1

        decompressed += char * int(num)

    return decompressed


def compression_analysis(original, compressed):
    original_size = len(original)
    compressed_size = len(compressed)

    if original_size == 0:
        return 0, 0, 0

    ratio = ((original_size - compressed_size) / original_size) * 100

    return original_size, compressed_size, ratio