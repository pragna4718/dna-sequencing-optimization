# backend/app/algorithms/dna_to_protein.py

CODON_TABLE = {
    "TTT": "Phenylalanine", "TTC": "Phenylalanine",
    "TTA": "Leucine", "TTG": "Leucine",
    "CTT": "Leucine", "CTC": "Leucine", "CTA": "Leucine", "CTG": "Leucine",

    "ATT": "Isoleucine", "ATC": "Isoleucine", "ATA": "Isoleucine",
    "ATG": "Methionine",  # Start codon

    "GTT": "Valine", "GTC": "Valine", "GTA": "Valine", "GTG": "Valine",

    "TCT": "Serine", "TCC": "Serine", "TCA": "Serine", "TCG": "Serine",
    "AGT": "Serine", "AGC": "Serine",
    "CCT": "Proline", "CCC": "Proline", "CCA": "Proline", "CCG": "Proline",

    "ACT": "Threonine", "ACC": "Threonine", "ACA": "Threonine", "ACG": "Threonine",

    "GCT": "Alanine", "GCC": "Alanine", "GCA": "Alanine", "GCG": "Alanine",

    "TAT": "Tyrosine", "TAC": "Tyrosine",
    "TAA": "STOP", "TAG": "STOP", "TGA": "STOP",

    "CAT": "Histidine", "CAC": "Histidine",
    "CAA": "Glutamine", "CAG": "Glutamine",

    "AAT": "Asparagine", "AAC": "Asparagine",
    "AAA": "Lysine", "AAG": "Lysine",

    "GAT": "Aspartic Acid", "GAC": "Aspartic Acid",
    "GAA": "Glutamic Acid", "GAG": "Glutamic Acid",

    "TGT": "Cysteine", "TGC": "Cysteine",

    "TGG": "Tryptophan",

    "CGT": "Arginine", "CGC": "Arginine", "CGA": "Arginine", "CGG": "Arginine",
    "AGA": "Arginine", "AGG": "Arginine",

    "GGT": "Glycine", "GGC": "Glycine", "GGA": "Glycine", "GGG": "Glycine"
}


def dna_to_amino_acids(dna_sequence: str, stop_at_stop=True):
    """
    Convert DNA sequence to amino acids using sliding window (codon = 3)
    Time Complexity: O(n)
    """

    dna_sequence = dna_sequence.upper().replace(" ", "")
    protein = []

    for i in range(0, len(dna_sequence) - 2, 3):
        codon = dna_sequence[i:i+3]

        amino_acid = CODON_TABLE.get(codon, "Unknown")

        if amino_acid == "STOP":
            if stop_at_stop:
                break
            protein.append("STOP")
        else:
            protein.append(amino_acid)

    return protein