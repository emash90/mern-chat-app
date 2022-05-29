    import {React, useState} from 'react'
    import { Link } from 'react-router-dom'
    import {Form, Button, Col, Row, Container} from 'react-bootstrap'
    import './Login.css'
    
    function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })
    const { email, password } = formData;
    const onChange = (e) => {
        setFormData((prevState)=> ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }
    const handleLogin = (e) => {
        e.preventDefault()
        console.log('handle login working');
    }
      return (
          <Container>
              <Row>
                  <Col className='login_bg'></Col>
                  <Col md={7} className='d-flex align-items-center justify-content-center flex-direction-column'>
                    <Form onSubmit={
                    handleLogin} style={{width: "80%", maxWidth: 500}}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control name='email' type="email" value={email} onChange={onChange} placeholder="Enter email" required/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control name='password' type="password" value={password} onChange={onChange} placeholder="Password"  required/>
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Login
                        </Button>
                    <div className='py-4'>
                        <p className='text-center'>
                            No account? <Link to="/register">Register</Link>
                        </p>
                    </div>
                    </Form>
                  </Col>
              </Row>

          </Container>
      )
    }
    
    export default Login
    