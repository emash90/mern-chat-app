import './App.css';
import Navigation from './components/Navigation';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Chat from './pages/Chat';
import { useState } from 'react'
import {useSelector} from 'react-redux'
import {AppContext, socket} from './context/appContext'

function App() {
  const [rooms, setRooms] = useState([])
  const [currentRoom, setCurrentRoom] = useState([])
  const [members, setMembers] = useState([])
  const [messages, setMessages] = useState([])
  const [privateMemberMessage, setPrivateMemberMessage] = useState({})
  const [newMessages, setNewMessages] = useState({})
  const user = useSelector((state) => state.user)
  return (
    <AppContext.Provider value={{socket, rooms, setRooms, currentRoom, setCurrentRoom, members, setMembers, messages, setMessages, privateMemberMessage, setPrivateMemberMessage, newMessages, setNewMessages}}>
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/chat' element={<Chat />} />
        </Routes>
      </BrowserRouter>
    </AppContext.Provider>
  );
}

export default App;
