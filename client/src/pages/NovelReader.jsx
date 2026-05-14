import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchNovel, addReview } from '../api';
import './NovelReader.css';

export default function NovelReader() {
  const { id } = useParams();
  const [novel, setNovel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeChapter, setActiveChapter] = useState(0);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewForm, setReviewForm] = useState({ reviewer: '', rating: 5, comment: '' });
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    fetchNovel(id).then((data) => { setNovel(data); setLoading(false); }).catch(() => setLoading(false));
  }, [id]);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const newReview = await addReview(id, reviewForm);
      setNovel((prev) => ({ ...prev, reviews: [...prev.reviews, newReview] }));
      setReviewForm({ reviewer: '', rating: 5, comment: '' });
      setShowReviewForm(false);
      setToast({ type: 'success', message: 'Review submitted!' });
      setTimeout(() => setToast(null), 3000);
    } catch {
      setToast({ type: 'error', message: 'Failed to submit review.' });
      setTimeout(() => setToast(null), 3000);
    }
    setSubmitting(false);
  };

  const avgRating = novel?.reviews?.length
    ? (novel.reviews.reduce((s, r) => s + r.rating, 0) / novel.reviews.length).toFixed(1)
    : null;

  if (loading) return (
    <main className="reader-page"><div className="container section-padding" style={{paddingTop:120}}>
      <div className="skeleton" style={{height:300,borderRadius:'var(--radius-lg)',marginBottom:24}} />
      <div className="skeleton" style={{height:600,borderRadius:'var(--radius-lg)'}} />
    </div></main>
  );

  if (!novel) return (
    <main className="reader-page"><div className="container section-padding" style={{paddingTop:120,textAlign:'center'}}>
      <h2>Novel not found</h2><Link to="/explore" className="btn btn-primary" style={{marginTop:16}}>Back to Explore</Link>
    </div></main>
  );

  return (
    <main className="reader-page" id="reader-page">
      {/* Hero header */}
      <section className="reader-hero" style={{ background: `linear-gradient(135deg, ${novel.coverColor}22, var(--bg-primary))` }}>
        <div className="container reader-hero-content">
          <Link to="/explore" className="back-link">← Back to Explore</Link>
          <div className="reader-hero-grid">
            <div className="reader-cover" style={{ background: `linear-gradient(135deg, ${novel.coverColor}, ${novel.coverColor}88)` }}>
              <div className="card-cover-pattern" />
              <span style={{ fontSize: '5rem' }}>📚</span>
            </div>
            <div className="reader-info">
              <span className="badge">{novel.genre}</span>
              <h1 className="reader-title">{novel.title}</h1>
              <p className="reader-author">by {novel.author}</p>
              <p className="reader-summary">{novel.summary}</p>
              <div className="reader-meta">
                <span>👁 {novel.reads?.toLocaleString()} reads</span>
                <span>📖 {novel.chapters.length} chapters</span>
                {avgRating && <span>⭐ {avgRating} ({novel.reviews.length} reviews)</span>}
                <span>📅 {novel.publishedDate}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container reader-layout">
        {/* Sidebar */}
        <aside className="reader-sidebar glass-card" id="chapter-sidebar">
          <h3 className="sidebar-title">Chapters</h3>
          <ul className="chapter-list">
            {novel.chapters.map((ch, i) => (
              <li key={i}>
                <button
                  className={`chapter-btn ${activeChapter === i ? 'active' : ''}`}
                  onClick={() => { setActiveChapter(i); window.scrollTo({top:500,behavior:'smooth'}); }}
                >
                  {ch.title}
                </button>
              </li>
            ))}
          </ul>
        </aside>

        {/* Reading area */}
        <div className="reader-content">
          <article className="chapter-content glass-card" id="chapter-content">
            <h2 className="chapter-heading">{novel.chapters[activeChapter].title}</h2>
            {novel.chapters[activeChapter].content.split('\n\n').map((para, i) => (
              <p key={i} className="chapter-paragraph">{para}</p>
            ))}
            <div className="chapter-nav">
              {activeChapter > 0 && (
                <button className="btn btn-secondary" onClick={() => { setActiveChapter(activeChapter - 1); window.scrollTo({top:500,behavior:'smooth'}); }}>← Previous</button>
              )}
              {activeChapter < novel.chapters.length - 1 && (
                <button className="btn btn-primary" onClick={() => { setActiveChapter(activeChapter + 1); window.scrollTo({top:500,behavior:'smooth'}); }}>Next →</button>
              )}
            </div>
          </article>

          {/* Reviews */}
          <section className="reviews-section" id="reviews-section">
            <div className="reviews-header">
              <h3 className="section-heading" style={{marginBottom:0}}>💬 Reviews ({novel.reviews.length})</h3>
              <button className="btn btn-primary" onClick={() => setShowReviewForm(!showReviewForm)}>
                {showReviewForm ? 'Cancel' : '✍️ Write Review'}
              </button>
            </div>

            {showReviewForm && (
              <form className="review-form glass-card" onSubmit={handleReviewSubmit} id="review-form">
                <div className="form-group">
                  <label>Your Name</label>
                  <input className="form-input" value={reviewForm.reviewer} onChange={(e) => setReviewForm({...reviewForm, reviewer: e.target.value})} required />
                </div>
                <div className="form-group">
                  <label>Rating</label>
                  <div className="rating-input">
                    {[1,2,3,4,5].map((s) => (
                      <button type="button" key={s} className={`star-btn ${s <= reviewForm.rating ? 'filled' : ''}`} onClick={() => setReviewForm({...reviewForm, rating: s})}>★</button>
                    ))}
                  </div>
                </div>
                <div className="form-group">
                  <label>Comment</label>
                  <textarea className="form-textarea" value={reviewForm.comment} onChange={(e) => setReviewForm({...reviewForm, comment: e.target.value})} required />
                </div>
                <button className="btn btn-primary" type="submit" disabled={submitting}>{submitting ? 'Submitting...' : 'Submit Review'}</button>
              </form>
            )}

            <div className="reviews-list">
              {novel.reviews.length === 0 ? (
                <p className="no-reviews">No reviews yet. Be the first!</p>
              ) : (
                novel.reviews.map((r) => (
                  <div key={r.id} className="review-card glass-card">
                    <div className="review-top">
                      <div className="reviewer-avatar">{r.reviewer.charAt(0).toUpperCase()}</div>
                      <div>
                        <strong className="reviewer-name">{r.reviewer}</strong>
                        <span className="review-date">{r.date}</span>
                      </div>
                      <div className="stars" style={{marginLeft:'auto'}}>
                        {[1,2,3,4,5].map((s) => <span key={s} className={`star ${s <= r.rating ? 'filled' : ''}`}>★</span>)}
                      </div>
                    </div>
                    <p className="review-comment">{r.comment}</p>
                  </div>
                ))
              )}
            </div>
          </section>
        </div>
      </div>

      {toast && <div className="toast-container"><div className={`toast toast-${toast.type}`}>{toast.message}</div></div>}
    </main>
  );
}
