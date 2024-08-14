import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './styles/App.scss';
import HomePage from './components/pages/HomePage/HomePage';
import AddNotePage from './components/pages/AddNotePage/AddNotePage';
import EditNotePage from './components/pages/EditNotePage/EditNotePage';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/add-note" element={<AddNotePage />} />
                <Route path="/edit-note/:id" element={<EditNotePage />} />
            </Routes>
        </Router>
    );
};

export default App;

