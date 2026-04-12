def detect_mutation(seq1, seq2):
    m, n = len(seq1), len(seq2)

    # Create DP table
    dp = [[0] * (n + 1) for _ in range(m + 1)]

    # Initialize base cases
    for i in range(m + 1):
        dp[i][0] = i
    for j in range(n + 1):
        dp[0][j] = j

    # Fill DP table
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if seq1[i - 1] == seq2[j - 1]:
                cost = 0
            else:
                cost = 1

            dp[i][j] = min(
                dp[i - 1][j] + 1,      # deletion
                dp[i][j - 1] + 1,      # insertion
                dp[i - 1][j - 1] + cost  # substitution
            )

    # Traceback to find operations
    i, j = m, n
    operations = []

    while i > 0 or j > 0:

        # Match (no operation)
        if i > 0 and j > 0 and seq1[i - 1] == seq2[j - 1]:
            i -= 1
            j -= 1

        # Substitution
        elif i > 0 and j > 0 and dp[i][j] == dp[i - 1][j - 1] + 1:
            operations.append(("Substitution", i, seq1[i - 1], seq2[j - 1]))
            i -= 1
            j -= 1

        # Deletion
        elif i > 0 and dp[i][j] == dp[i - 1][j] + 1:
            operations.append(("Deletion", i, seq1[i - 1], "-"))
            i -= 1

        # Insertion
        else:
            operations.append(("Insertion", i + 1, "-", seq2[j - 1]))
            j -= 1

    operations.reverse()

    return dp[m][n], operations


def calculate_similarity(seq1, seq2):
    matches = sum(1 for a, b in zip(seq1, seq2) if a == b)
    max_len = max(len(seq1), len(seq2))
    return (matches / max_len) * 100


def get_aligned_sequences(seq1, seq2):
    m, n = len(seq1), len(seq2)

    # DP table
    dp = [[0] * (n + 1) for _ in range(m + 1)]

    for i in range(m + 1):
        dp[i][0] = i
    for j in range(n + 1):
        dp[0][j] = j

    # Fill DP
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if seq1[i - 1] == seq2[j - 1]:
                cost = 0
            else:
                cost = 1

            dp[i][j] = min(
                dp[i - 1][j] + 1,
                dp[i][j - 1] + 1,
                dp[i - 1][j - 1] + cost
            )

    # Build aligned sequences
    i, j = m, n
    aligned1 = []
    aligned2 = []

    while i > 0 or j > 0:

        if i > 0 and j > 0 and seq1[i - 1] == seq2[j - 1]:
            aligned1.append(seq1[i - 1])
            aligned2.append(seq2[j - 1])
            i -= 1
            j -= 1

        elif i > 0 and j > 0 and dp[i][j] == dp[i - 1][j - 1] + 1:
            aligned1.append(seq1[i - 1])
            aligned2.append(seq2[j - 1])
            i -= 1
            j -= 1

        elif i > 0 and dp[i][j] == dp[i - 1][j] + 1:
            aligned1.append(seq1[i - 1])
            aligned2.append('-')
            i -= 1

        else:
            aligned1.append('-')
            aligned2.append(seq2[j - 1])
            j -= 1

    return aligned1[::-1], aligned2[::-1]