import webbrowser
from mutation_logic import get_aligned_sequences

def generate_alignment_html(seq1, seq2, operations):

    aligned1, aligned2 = get_aligned_sequences(seq1, seq2)

    html = """
    <html>
    <head>
    <style>
        body {
            font-family: Arial;
            padding: 40px;
        }

        h2 {
            margin-bottom: 10px;
        }

        .seq {
            font-size: 32px;
            letter-spacing: 12px;
            line-height: 60px;
        }

        .char {
            display: inline-block;
            width: 28px;
            text-align: center;
        }

        .mismatch {
            background-color: #ff4d4d;
            color: white;
            border-radius: 6px;
            padding: 6px;
        }

        .indel {
            background-color: #9be79b;
            border-radius: 6px;
            padding: 6px;
        }

        .connector {
            font-size: 32px;
            letter-spacing: 12px;
            color: #3b6ea5;
            height: 40px;
        }

        .legend {
            margin-top: 20px;
            font-size: 20px;
        }

        .red { color: red; }
        .green { color: green; }

    </style>
    </head>
    <body>
    """

    # 🔹 TITLE 1
    html += "<h2>Ancestral sequence:</h2>"
    html += "<div class='seq'>"

    for c in aligned1:
        html += f"<span class='char'>{c}</span>"

    html += "</div><br>"

    # 🔹 TITLE 2
    html += "<h2>Sequence derived from ancestral sequence:</h2>"
    html += "<div class='seq'>"

    for a, b in zip(aligned1, aligned2):

        # Indel
        if a == '-' or b == '-':
            html += f"<span class='char indel'>{b}</span>"

        # Mismatch
        elif a != b:
            html += f"<span class='char mismatch'>{b}</span>"

        # Match
        else:
            html += f"<span class='char'>{b}</span>"

    html += "</div>"

    # 🔹 LEGEND
    html += """
    <div class="legend">
        <div class="red">mismatches</div>
        <div class="green">indels</div>
    </div>
    """

    # 🔹 ALIGNMENT SECTION
    html += "<h2 style='margin-top:40px;'>Alignment:</h2>"

    # Top sequence
    html += "<div class='seq'>"
    for c in aligned1:
        html += f"<span class='char'>{c}</span>"
    html += "</div>"

    # 🔥 CONNECTOR (vertical bars like image)
    html += "<div class='connector'>"
    for a, b in zip(aligned1, aligned2):
        if a == b:
            html += "<span class='char'>|</span>"
        else:
            html += "<span class='char'> </span>"
    html += "</div>"

    # Bottom sequence
    html += "<div class='seq'>"
    for c in aligned2:
        html += f"<span class='char'>{c}</span>"
    html += "</div>"

    html += "</body></html>"

    with open("alignment.html", "w", encoding="utf-8") as f:
        f.write(html)

    webbrowser.open("alignment.html")