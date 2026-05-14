const API_BASE = 'http://localhost:5001/api';

export async function fetchNovels() {
  const res = await fetch(`${API_BASE}/novels`);
  if (!res.ok) throw new Error('Failed to fetch novels');
  return res.json();
}

export async function fetchNovel(id) {
  const res = await fetch(`${API_BASE}/novels/${id}`);
  if (!res.ok) throw new Error('Failed to fetch novel');
  return res.json();
}

export async function createNovel(novelData) {
  const res = await fetch(`${API_BASE}/novels`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(novelData),
  });
  if (!res.ok) throw new Error('Failed to create novel');
  return res.json();
}

export async function addReview(novelId, reviewData) {
  const res = await fetch(`${API_BASE}/novels/${novelId}/reviews`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(reviewData),
  });
  if (!res.ok) throw new Error('Failed to add review');
  return res.json();
}
