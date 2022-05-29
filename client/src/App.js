import './App.css';
import Navigation from './components/Navigation';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Chat from './pages/Chat';

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/chat' element={<Chat />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
