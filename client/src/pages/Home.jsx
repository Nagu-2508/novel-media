import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import NovelCard from '../components/NovelCard';
import { fetchNovels } from '../api';
import './Home.css';

export default function Home() {
  const [novels, setNovels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNovels().then((data) => { setNovels(data); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  const featured = novels.length > 0 ? novels.reduce((a, b) => (a.reads > b.reads ? a : b)) : null;

  return (
    <main className="home-page">
      {/* Hero */}
      <section className="hero" id="hero-section">
        <div className="hero-bg">
          <div className="hero-orb hero-orb-1" />
          <div className="hero-orb hero-orb-2" />
          <div className="hero-orb hero-orb-3" />
        </div>
        <div className="container hero-content">
          <span className="hero-badge animate-fade-in-up">✨ A New Era of Storytelling</span>
          <h1 className="hero-title animate-fade-in-up delay-1">
            Where Every <span className="hero-highlight">Story</span> Finds Its Voice
          </h1>
          <p className="hero-subtitle animate-fade-in-up delay-2">
            Publish your novels, discover new worlds, and connect with a community of passionate readers and writers.
          </p>
          <div className="hero-actions animate-fade-in-up delay-3">
            <Link to="/explore" className="btn btn-primary btn-lg">🔍 Explore Novels</Link>
            <Link to="/publish" className="btn btn-secondary btn-lg">✍️ Start Writing</Link>
          </div>
          <div className="hero-stats animate-fade-in-up delay-4">
            <div className="hero-stat"><span className="stat-number">{novels.length}</span><span className="stat-label">Published</span></div>
            <div className="stat-divider" />
            <div className="hero-stat"><span className="stat-number">{novels.reduce((s, n) => s + (n.reads || 0), 0).toLocaleString()}</span><span className="stat-label">Total Reads</span></div>
            <div className="stat-divider" />
            <div className="hero-stat"><span className="stat-number">{novels.reduce((s, n) => s + (n.reviews?.length || 0), 0)}</span><span className="stat-label">Reviews</span></div>
          </div>
        </div>
      </section>

      {/* Featured */}
      {featured && (
        <section className="section-padding" id="featured-section">
          <div className="container">
            <h2 className="section-heading">🔥 Featured Novel</h2>
            <Link to={`/novel/${featured.id}`} className="featured-card glass-card">
              <div className="featured-cover" style={{ background: `linear-gradient(135deg, ${featured.coverColor}, ${featured.coverColor}88)` }}>
                <div className="card-cover-pattern" />
                <span style={{ fontSize: '4rem' }}>📚</span>
              </div>
              <div className="featured-body">
                <span className="badge">{featured.genre}</span>
                <h3 className="featured-title">{featured.title}</h3>
                <p className="featured-author">by {featured.author}</p>
                <p className="featured-summary">{featured.summary}</p>
                <div className="featured-meta">
                  <span>👁 {featured.reads?.toLocaleString()} reads</span>
                  <span>📖 {featured.chapterCount} chapters</span>
                  <span>💬 {featured.reviews?.length || 0} reviews</span>
                </div>
                <span className="btn btn-primary" style={{ alignSelf: 'flex-start', marginTop: 8 }}>Read Now →</span>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* Recent */}
      <section className="section-padding" id="recent-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-heading">📚 Recently Published</h2>
            <Link to="/explore" className="btn btn-secondary">View All →</Link>
          </div>
          {loading ? (
            <div className="novel-grid">
              {[1,2,3].map(i => <div key={i} className="skeleton" style={{height:360, borderRadius: 'var(--radius-lg)'}} />)}
            </div>
          ) : (
            <div className="novel-grid">
              {novels.slice(0, 6).map((novel, i) => (
                <NovelCard key={novel.id} novel={novel} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section" id="cta-section">
        <div className="container cta-content">
          <h2 className="cta-title">Ready to Share Your Story?</h2>
          <p className="cta-subtitle">Join our community of writers and bring your imagination to life.</p>
          <Link to="/publish" className="btn btn-primary btn-lg">✍️ Start Writing Today</Link>
        </div>
      </section>
    </main>
  );
}
