import { useEffect, useState } from 'react';
import NovelCard from '../components/NovelCard';
import { fetchNovels } from '../api';
import './Explore.css';

const GENRES = ['All', 'Fantasy', 'Science Fiction', 'Literary Fiction', 'Romance', 'Thriller', 'Horror'];

export default function Explore() {
  const [novels, setNovels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [genre, setGenre] = useState('All');
  const [sort, setSort] = useState('recent');

  useEffect(() => {
    fetchNovels().then((data) => { setNovels(data); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  let filtered = novels.filter((n) => {
    const matchesSearch = n.title.toLowerCase().includes(search.toLowerCase()) || n.author.toLowerCase().includes(search.toLowerCase());
    const matchesGenre = genre === 'All' || n.genre === genre;
    return matchesSearch && matchesGenre;
  });

  if (sort === 'reads') filtered.sort((a, b) => (b.reads || 0) - (a.reads || 0));
  else if (sort === 'title') filtered.sort((a, b) => a.title.localeCompare(b.title));
  else filtered.sort((a, b) => new Date(b.publishedDate) - new Date(a.publishedDate));

  return (
    <main className="explore-page" id="explore-page">
      <div className="container section-padding" style={{ paddingTop: 120 }}>
        <h1 className="page-title animate-fade-in-up">Explore Novels</h1>
        <p className="page-subtitle animate-fade-in-up delay-1">Discover your next favorite story from our growing library.</p>

        <div className="explore-filters animate-fade-in-up delay-2">
          <div className="search-box">
            <span className="search-icon">🔍</span>
            <input
              type="text" className="form-input search-input"
              placeholder="Search by title or author..."
              value={search} onChange={(e) => setSearch(e.target.value)}
              id="search-input"
            />
          </div>
          <div className="filter-row">
            <div className="genre-pills">
              {GENRES.map((g) => (
                <button
                  key={g}
                  className={`genre-pill ${genre === g ? 'active' : ''}`}
                  onClick={() => setGenre(g)}
                >
                  {g}
                </button>
              ))}
            </div>
            <select className="form-select sort-select" value={sort} onChange={(e) => setSort(e.target.value)} id="sort-select">
              <option value="recent">Most Recent</option>
              <option value="reads">Most Read</option>
              <option value="title">A-Z</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="novel-grid">{[1,2,3,4,5,6].map(i => <div key={i} className="skeleton" style={{height:360, borderRadius: 'var(--radius-lg)'}} />)}</div>
        ) : filtered.length === 0 ? (
          <div className="empty-state">
            <span style={{ fontSize: '3rem' }}>📭</span>
            <h3>No novels found</h3>
            <p>Try adjusting your search or filters.</p>
          </div>
        ) : (
          <>
            <p className="results-count">{filtered.length} novel{filtered.length !== 1 ? 's' : ''} found</p>
            <div className="novel-grid">
              {filtered.map((novel, i) => <NovelCard key={novel.id} novel={novel} index={i} />)}
            </div>
          </>
        )}
      </div>
    </main>
  );
}
