import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import CreateUserPage from './pages/CreateUserPage';
import HomePage from './pages/HomePage';
import CreateUserSuccessPage from './pages/CreateUserSuccessPage';
import CrearTareaPage from './pages/CreateTaskPage';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/create-user" element={<CreateUserPage />} />
        <Route path="/create-user-success" element={<CreateUserSuccessPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/crear-tarea" element={<CrearTareaPage />} />
      </Routes>
    </Router>
  );
}

export default App;
