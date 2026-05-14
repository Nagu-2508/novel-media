import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { v4 as uuidv4 } from 'uuid';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5001;
const DATA_FILE = path.join(__dirname, 'data', 'novels.json');

// Middleware
app.use(cors());
app.use(express.json());

// --- Helpers ---
function readNovels() {
  const data = fs.readFileSync(DATA_FILE, 'utf-8');
  return JSON.parse(data);
}

function writeNovels(novels) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(novels, null, 2));
}

// --- API Routes ---

// GET /api/novels  — list all novels (without full chapter content for performance)
app.get('/api/novels', (req, res) => {
  try {
    const novels = readNovels();
    const summary = novels.map(({ chapters, ...rest }) => ({
      ...rest,
      chapterCount: chapters.length,
    }));
    res.json(summary);
  } catch (err) {
    res.status(500).json({ error: 'Failed to read novels.' });
  }
});

// GET /api/novels/:id — get a single novel with full content
app.get('/api/novels/:id', (req, res) => {
  try {
    const novels = readNovels();
    const novel = novels.find((n) => n.id === req.params.id);
    if (!novel) return res.status(404).json({ error: 'Novel not found.' });

    // Increment reads
    novel.reads = (novel.reads || 0) + 1;
    writeNovels(novels);

    res.json(novel);
  } catch (err) {
    res.status(500).json({ error: 'Failed to read novel.' });
  }
});

// POST /api/novels — create / publish a new novel
app.post('/api/novels', (req, res) => {
  try {
    const { title, author, genre, summary, chapters, coverColor } = req.body;

    if (!title || !author || !genre || !summary || !chapters || !chapters.length) {
      return res.status(400).json({ error: 'Missing required fields: title, author, genre, summary, and at least one chapter.' });
    }

    const novels = readNovels();
    const newNovel = {
      id: uuidv4(),
      title,
      author,
      genre,
      coverColor: coverColor || '#6C3CE1',
      summary,
      chapters,
      reviews: [],
      publishedDate: new Date().toISOString().split('T')[0],
      reads: 0,
    };

    novels.push(newNovel);
    writeNovels(novels);
    res.status(201).json(newNovel);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create novel.' });
  }
});

// POST /api/novels/:id/reviews — add a review to a novel
app.post('/api/novels/:id/reviews', (req, res) => {
  try {
    const { reviewer, rating, comment } = req.body;
    if (!reviewer || !rating || !comment) {
      return res.status(400).json({ error: 'Missing required fields: reviewer, rating, comment.' });
    }

    const novels = readNovels();
    const novel = novels.find((n) => n.id === req.params.id);
    if (!novel) return res.status(404).json({ error: 'Novel not found.' });

    const newReview = {
      id: uuidv4(),
      reviewer,
      rating: Number(rating),
      comment,
      date: new Date().toISOString().split('T')[0],
    };

    novel.reviews.push(newReview);
    writeNovels(novels);
    res.json(newReview);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add review.' });
  }
});

// DELETE /api/novels/:id — delete a novel
app.delete('/api/novels/:id', (req, res) => {
  try {
    let novels = readNovels();
    const idx = novels.findIndex((n) => n.id === req.params.id);
    if (idx === -1) return res.status(404).json({ error: 'Novel not found.' });

    novels.splice(idx, 1);
    writeNovels(novels);
    res.json({ message: 'Novel deleted.' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete novel.' });
  }
});

// --- Start Server ---
app.listen(PORT, () => {
  console.log(`🚀 NovelMedia API running at http://localhost:${PORT}`);
});
