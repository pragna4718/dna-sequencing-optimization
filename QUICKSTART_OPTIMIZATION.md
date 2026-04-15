# Quick Start Guide - DNA Sequencing Optimization

## 🚀 Start Both Servers

### Terminal 1 - Backend (Port 8000):
```bash
cd backend
source venv/bin/activate
python3 -m uvicorn app.main:app --reload
```

Expected output:
```
INFO:     Uvicorn running on http://0.0.0.0:8000
INFO:     Application startup complete.
```

### Terminal 2 - Frontend (Port 3000):
```bash
cd frontend
npm start
```

Expected output:
```
Compiled successfully!

You can now view frontend in the browser.
  Local:            http://localhost:3000
```

---

## 🌐 Access the Application

Open your browser to: **http://localhost:3000**

---

## 📖 How to Use the Optimization Window

### Step 1: Navigate to Optimization
1. Click the hamburger menu (top-right corner)
2. Select "Algorithm Explanations" (first menu item with ⚙️ icon)

### Step 2: Enter DNA Sequence
- Enter any DNA sequence in the textarea
- Example: `ATGGCCTATCGAATGGCCTATCGA`
- Minimum: 3 bases (A, T, C, G only)
- Maximum: Any length (but Branch & Bound limits to 12bp internally)
- Real-time base counter shows total bases

### Step 3: Click Optimize
- Click "Optimize →" button
- Wait for all 6 algorithms to process
- Results display in a 2-column grid

### Step 4: View Results for Each Algorithm

Each card shows:
- **Algorithm Name** - Bold title (e.g., "Greedy Algorithm")
- **Output Sequence** - Optimized DNA sequence (monospace, cyan text)
- **Time Complexity** - How algorithm scales (e.g., O(n))
- **Space Complexity** - Memory required (e.g., O(n))
- **Execution Time** - Actual runtime in milliseconds
- **Output Length** - Number of bases in result

### Step 5: View Visualization
- Click "📊 View Visualization & Analysis" button at bottom
- Modal opens with detailed comparison:
  - Algorithm selector (left sidebar or top buttons)
  - Input vs Output side-by-side
  - Complexity metrics
  - Algorithm explanation

### Step 6: Switch Between Algorithms
- In visualization modal, click different algorithm buttons
- Data updates instantly
- Close button (✕) in top-right closes modal

---

## 🧪 Quick Test Commands

### Test Backend API:
```bash
curl -X POST http://localhost:8000/optimize/optimize \
  -H "Content-Type: application/json" \
  -d '{"sequence":"ATCGATCGATCG"}' | python3 -m json.tool
```

### Test Frontend Build:
```bash
cd frontend
npm run build
```

### Check if Servers are Running:
```bash
# Check backend port 8000
lsof -i :8000

# Check frontend port 3000
lsof -i :3000
```

---

## 📊 Algorithm Quick Reference

| Algorithm | Time | Space | Best For |
|-----------|------|-------|----------|
| Greedy | O(n) | O(n) | Fast processing |
| Divide & Conquer | O(n log n) | O(log n) | Balanced approach |
| String Matching | O(n·m) | O(1) | Pattern removal |
| Hashing | O(n) | O(n) | Duplicate detection |
| Sliding Window | O(n) | O(1) | Local optimization |
| Branch & Bound | O(2^n) | O(n) | Optimal solution (small subsets) |

---

## 🎨 UI/UX Tips

### Color Guide:
- **Cyan (#00e5ff)**: Text, borders, glows - main accent
- **Purple (#a855f7)**: Card backgrounds, highlights
- **Green (#00ff88)**: Status indicators, success
- **Dark Gradient**: Background (#0a0e27 → #1a1a2e)

### Responsive Design:
- **Desktop (1200px+)**: 2-column grid layout
- **Tablet (768px-1199px)**: 1-column grid, modal adjusts
- **Mobile (<768px)**: Full-width stacked layout

---

## 🛠️ Troubleshooting

### "Failed to optimize sequence"
```bash
# Solution: Verify backend is running
curl http://localhost:8000/optimize/optimize -X POST \
  -H "Content-Type: application/json" \
  -d '{"sequence":"AT"}'
```

### "Module not found" errors
```bash
# Install dependencies
cd frontend
npm install

# Or backend
cd backend
source venv/bin/activate
pip install -r requirements.txt
```

### Port already in use
```bash
# Kill process on port 8000 (backend)
lsof -ti:8000 | xargs kill -9

# Kill process on port 3000 (frontend)
lsof -ti:3000 | xargs kill -9
```

### Slow performance
- Use shorter sequences (< 50 bases)
- Branch & Bound is slowest (explores 2^n possibilities)
- Browser DevTools Network tab shows full response time

---

## 📁 Key Files

### Frontend Code:
- `/frontend/src/App.js` - Main component (AlgorithmExplanationsPage lines ~680-850)
- `/frontend/src/App.css` - Styling (opt-* classes lines ~1030-1320)
- `/frontend/src/services/api.js` - API calls (runOptimize function)

### Backend Code:
- `/backend/app/api/optimize.py` - 6 algorithms implementation
- `/backend/app/main.py` - FastAPI setup with router

### Configuration:
- `/frontend/.env` - API_BASE_URL=http://localhost:8000
- `/backend/requirements.txt` - Python dependencies

---

## 📝 Example Sequences to Try

### Short (Fast):
```
ATCG
ATGGCC
ATCGATCGATCG
```

### Medium (Realistic):
```
ATGATGATGATGATGATGATG
GCTAGCTAGCTAGCTAGCTAGCTAG
AATGAATGAATGAATGAATGAATG
```

### Long (Comprehensive):
```
ATGATGATGATGATGATGATGATGATGATGATGATGATGATGATGATGATGATGATGATGATGATG
GCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAG
```

### Pattern-rich:
```
AAATTTCCCGGGAAATTTCCCGGG
TTTTTTAAAAAACCCCCGGGGGG
ATATATAT
```

---

## 🔗 Menu Navigation

After opening Optimization window, go back to main menu:
1. Click "← " (back button in top-left)
2. Or click hamburger menu and select different page

All menu items:
1. ⚙️ Algorithm Explanations (Optimization)
2. 🧬 DNA Sequence to Amino Acids
3. 📦 DNA Compression (RLE)
4. 🔬 DNA Mutation (Levenshtein)
5. 📋 DNA Codon-Amino Acid Table
6. 🌍 Real World Applications

---

## 💡 Tips & Tricks

1. **Compare algorithms**: Use same sequence for all 6 algorithms to see differences
2. **Check complexity**: Branch & Bound intentionally slower (O(2^n)) but more optimal
3. **Performance**: Greedy is fastest, good for real-time applications
4. **Choose algorithm**: 
   - For production: Use Greedy or Sliding Window
   - For learning: Use Branch & Bound to understand optimization
   - For patterns: Use String Matching for known problematic sequences

---

## 📞 Support

**Built with:**
- React 19.2.5
- FastAPI
- Python 3.x
- Node.js

**Status**: ✅ Production Ready
**Last Updated**: April 15, 2026
**Version**: 1.0
