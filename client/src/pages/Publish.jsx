import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createNovel } from '../api';
import './Publish.css';

const COLORS = ['#6C3CE1', '#0EA5E9', '#10B981', '#F43F5E', '#F59E0B', '#8B5CF6', '#EC4899', '#14B8A6'];

export default function Publish() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: '', author: '', genre: '', summary: '', coverColor: '#6C3CE1',
    chapters: [{ title: 'Chapter 1', content: '' }],
  });
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState(null);

  const updateChapter = (i, field, value) => {
    const chapters = [...form.chapters];
    chapters[i] = { ...chapters[i], [field]: value };
    setForm({ ...form, chapters });
  };
  const addChapter = () => {
    setForm({ ...form, chapters: [...form.chapters, { title: `Chapter ${form.chapters.length + 1}`, content: '' }] });
  };
  const removeChapter = (i) => {
    if (form.chapters.length <= 1) return;
    setForm({ ...form, chapters: form.chapters.filter((_, idx) => idx !== i) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const novel = await createNovel(form);
      setToast({ type: 'success', message: 'Novel published successfully!' });
      setTimeout(() => navigate(`/novel/${novel.id}`), 1500);
    } catch {
      setToast({ type: 'error', message: 'Failed to publish. Please try again.' });
      setTimeout(() => setToast(null), 3000);
    }
    setSubmitting(false);
  };

  return (
    <main className="publish-page" id="publish-page">
      <div className="container section-padding" style={{ paddingTop: 120 }}>
        <h1 className="page-title animate-fade-in-up">✍️ Publish Your Novel</h1>
        <p className="page-subtitle animate-fade-in-up delay-1">Share your story with the world.</p>

        <form className="publish-form animate-fade-in-up delay-2" onSubmit={handleSubmit}>
          <div className="publish-grid">
            {/* Left: Details */}
            <div className="publish-details glass-card" style={{ padding: 32 }}>
              <h2 className="form-section-title">Novel Details</h2>
              <div className="form-group">
                <label>Title *</label>
                <input className="form-input" value={form.title} onChange={(e) => setForm({...form, title: e.target.value})} required placeholder="Enter your novel title" id="novel-title" />
              </div>
              <div className="form-group">
                <label>Author Name *</label>
                <input className="form-input" value={form.author} onChange={(e) => setForm({...form, author: e.target.value})} required placeholder="Your pen name" id="novel-author" />
              </div>
              <div className="form-group">
                <label>Genre *</label>
                <select className="form-select" value={form.genre} onChange={(e) => setForm({...form, genre: e.target.value})} required id="novel-genre">
                  <option value="">Select a genre</option>
                  <option>Fantasy</option>
                  <option>Science Fiction</option>
                  <option>Literary Fiction</option>
                  <option>Romance</option>
                  <option>Thriller</option>
                  <option>Horror</option>
                  <option>Mystery</option>
                  <option>Non-Fiction</option>
                </select>
              </div>
              <div className="form-group">
                <label>Summary *</label>
                <textarea className="form-textarea" value={form.summary} onChange={(e) => setForm({...form, summary: e.target.value})} required placeholder="A compelling summary of your novel..." id="novel-summary" />
              </div>
              <div className="form-group">
                <label>Cover Color</label>
                <div className="color-picker">
                  {COLORS.map((c) => (
                    <button type="button" key={c} className={`color-swatch ${form.coverColor === c ? 'active' : ''}`} style={{ background: c }} onClick={() => setForm({...form, coverColor: c})} />
                  ))}
                </div>
              </div>

              {/* Cover Preview */}
              <div className="cover-preview" style={{ background: `linear-gradient(135deg, ${form.coverColor}, ${form.coverColor}88)` }}>
                <div className="card-cover-pattern" />
                <span style={{ fontSize: '3rem', position: 'relative', zIndex: 1 }}>📚</span>
                <p style={{ position: 'relative', zIndex: 1, fontWeight: 700, marginTop: 8 }}>{form.title || 'Your Title'}</p>
                <p style={{ position: 'relative', zIndex: 1, fontSize: '0.85rem', opacity: 0.8 }}>by {form.author || 'Author'}</p>
              </div>
            </div>

            {/* Right: Chapters */}
            <div className="publish-chapters">
              <div className="chapters-header">
                <h2 className="form-section-title">Chapters</h2>
                <button type="button" className="btn btn-secondary" onClick={addChapter}>+ Add Chapter</button>
              </div>
              {form.chapters.map((ch, i) => (
                <div key={i} className="chapter-editor glass-card" style={{ padding: 28 }}>
                  <div className="chapter-editor-header">
                    <span className="chapter-number">#{i + 1}</span>
                    {form.chapters.length > 1 && (
                      <button type="button" className="remove-chapter-btn" onClick={() => removeChapter(i)}>✕</button>
                    )}
                  </div>
                  <div className="form-group">
                    <label>Chapter Title</label>
                    <input className="form-input" value={ch.title} onChange={(e) => updateChapter(i, 'title', e.target.value)} required />
                  </div>
                  <div className="form-group">
                    <label>Content *</label>
                    <textarea className="form-textarea chapter-textarea" value={ch.content} onChange={(e) => updateChapter(i, 'content', e.target.value)} required placeholder="Write your chapter content here..." />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="publish-actions">
            <button type="submit" className="btn btn-primary btn-lg" disabled={submitting} id="publish-btn">
              {submitting ? '📤 Publishing...' : '🚀 Publish Novel'}
            </button>
          </div>
        </form>
      </div>

      {toast && <div className="toast-container"><div className={`toast toast-${toast.type}`}>{toast.message}</div></div>}
    </main>
  );
}
