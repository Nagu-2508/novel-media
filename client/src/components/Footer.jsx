import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer" id="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link to="/" className="footer-logo">📖 Novel<span className="brand-accent">Media</span></Link>
            <p className="footer-tagline">Where stories come alive. Publish, discover, and connect through the power of narrative.</p>
          </div>
          <div className="footer-col">
            <h4>Platform</h4>
            <Link to="/explore">Explore</Link>
            <Link to="/publish">Publish</Link>
          </div>
          <div className="footer-col">
            <h4>Genres</h4>
            <span>Fantasy</span>
            <span>Sci-Fi</span>
            <span>Romance</span>
            <span>Literary Fiction</span>
          </div>
          <div className="footer-col">
            <h4>Connect</h4>
            <span>Twitter</span>
            <span>Discord</span>
            <span>GitHub</span>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2024 NovelMedia. Built with ❤️ for storytellers everywhere.</p>
        </div>
      </div>
    </footer>
  );
}
