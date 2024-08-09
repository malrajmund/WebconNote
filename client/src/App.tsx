import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './styles/App.scss';
import HomePage from './components/pages/HomePage/HomePage';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                {/* <Route path="/notes/:id" element={<NoteDetailPage />} />
      <Route path="/add-note" element={<AddNotePage />} />
      <Route path="/not-found" element={<NotFoundPage />} />
      <Route path="*" element={<Navigate to="/not-found" />} /> */}
            </Routes>
        </Router>
    );
};

export default App;

