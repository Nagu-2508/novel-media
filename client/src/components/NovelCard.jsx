import { Link } from 'react-router-dom';
import './NovelCard.css';

export default function NovelCard({ novel, index }) {
  const avgRating = novel.reviews && novel.reviews.length
    ? (novel.reviews.reduce((s, r) => s + r.rating, 0) / novel.reviews.length).toFixed(1)
    : null;

  return (
    <Link
      to={`/novel/${novel.id}`}
      className={`novel-card glass-card animate-fade-in-up delay-${(index % 4) + 1}`}
      id={`novel-card-${novel.id}`}
    >
      <div className="card-cover" style={{ background: `linear-gradient(135deg, ${novel.coverColor}, ${novel.coverColor}88)` }}>
        <div className="card-cover-pattern" />
        <span className="card-cover-icon">📚</span>
        <span className="card-chapter-count">{novel.chapterCount || 0} ch.</span>
      </div>
      <div className="card-body">
        <span className="badge">{novel.genre}</span>
        <h3 className="card-title">{novel.title}</h3>
        <p className="card-author">by {novel.author}</p>
        <p className="card-summary">{novel.summary}</p>
        <div className="card-footer">
          <div className="card-stats">
            <span className="card-stat">👁 {novel.reads?.toLocaleString()}</span>
            {avgRating && <span className="card-stat">⭐ {avgRating}</span>}
          </div>
          <span className="card-read-btn">Read →</span>
        </div>
      </div>
    </Link>
  );
}
