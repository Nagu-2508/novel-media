import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Explore from './pages/Explore';
import NovelReader from './pages/NovelReader';
import Publish from './pages/Publish';

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/novel/:id" element={<NovelReader />} />
        <Route path="/publish" element={<Publish />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
