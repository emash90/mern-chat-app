import { React, useEffect } from 'react'
import { ListGroup, ListGroupItem } from 'react-bootstrap'
import { useContext } from 'react'
import {useSelector} from 'react-redux'
import {AppContext} from '../context/appContext'


function Sidebar() {
const user = useSelector((state) => state.user)
const {socket, members, setMembers, rooms, setRooms, currentRoom, setCurrentRoom, privateMemberMessage, setPrivateMemberMessage} = useContext(AppContext)

useEffect(() => {
   if(user) {
       setCurrentRoom('general')
       getRooms()
       socket.emit('join-room', 'general')
       socket.emit('new-user')
   }
}, [])


//const rooms = ['first room', 'second room', 'third room']
socket.off('new-user').on('new-user', (payload) => {
    setMembers(payload);
} )
const getRooms = () => {
    fetch('http://localhost:5000/rooms')
    .then((res) => res.json())
    .then((data) => setRooms(data))
}
  return (
    <>
        <h2>Available Rooms</h2>
        <ListGroup>
            {rooms.map((room, index) => (
                <ListGroup.Item key={index}>
                    {room}
                </ListGroup.Item>
            ))}
        </ListGroup>
        <h2>members</h2>
        {members.map((member) => (<ListGroup.Item key={member._id} style={{cursor: 'pointer'}}>
            {member.firstName}
        </ListGroup.Item>))}
    </>
  )
}

export default Sidebar