import React from 'react'
import { Button, Form, Col, Row } from 'react-bootstrap'
import './MessageContainer.css'

function MessageContainer() {
const onSubmit = (e) => {
    e.preventDefault()
    console.log('message form working');
}
  return (
    <>
    <div className='message-output'></div>
    <Form onSubmit={onSubmit}>
        <Row>
            <Col md={11}>
                <Form.Group>
                    <Form.Control type='text' placeholder='enter message' ></Form.Control>
                </Form.Group>
            </Col>
            <Col md={1}>
                <Button variant='primary' type='submit' style={{width: '100%', backgroundColor: 'green'}} >
                    <i className='fas fa-paper-plane'></i>
                </Button>
            </Col>
        </Row>
    </Form>
   </>
  )
}

export default MessageContainer