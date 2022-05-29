    import React from 'react'
    import { Link } from 'react-router-dom'
    import {Form, Button, Col, Row, Container} from 'react-bootstrap'
    import './Login.css'
    
    function Login() {
      return (
          <Container>
              <Row>
                  <Col className='login_bg'></Col>
                  <Col md={7} className='d-flex align-items-center justify-content-center flex-direction-column'>
                    <Form style={{width: "80%", maxWidth: 500}}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" />
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
    