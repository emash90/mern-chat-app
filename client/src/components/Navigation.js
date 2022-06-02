import React from 'react'
import { useSelector } from 'react-redux'
import {Nav, Navbar, Button, Container, NavDropdown} from 'react-bootstrap'
import { useLogoutUserMutation } from '../services/appApi'
import { LinkContainer  } from 'react-router-bootstrap'
import logo from '../assets/logo.png'
import { useNavigate } from 'react-router-dom'

function Navigation() {
  const navigate = useNavigate()
  const [logoutUser] = useLogoutUserMutation()
  const user = useSelector((state) => state.user)
  const handleLogout = async(e) => {
    e.preventDefault()
    await logoutUser(user)
    navigate('/login')
  }
  return (
    <Navbar bg="light" expand="lg">
    <Container>
      <LinkContainer to="/">
      <Navbar.Brand>
       <p>M.E.R.N <span><img src={logo} alt="logo-img" style={{width: 50, height: 50}} /></span></p>
      </Navbar.Brand>
      </LinkContainer>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto">
        {!user ? (
          <>
          <LinkContainer to='/login'>
            <Nav.Link>Login</Nav.Link>
          </LinkContainer>
          <LinkContainer to='/register'>
            <Nav.Link>Register</Nav.Link>
          </LinkContainer>
          </>
          ) : (
            <>
          <LinkContainer to='/chat'>
            <Nav.Link>Chat</Nav.Link>
          </LinkContainer>
          
          <NavDropdown title={
            <>
            <img src={user.picture} style={{width: 30, height: 30}} alt="" />
            {user.firstName}
            </>
          } id="basic-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item >
              <Button variant='danger' onClick={handleLogout}>logout</Button>
            </NavDropdown.Item>
          </NavDropdown>
          </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  )
}

export default Navigation