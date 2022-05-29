import React from 'react'
import {Container, Col, Row} from 'react-bootstrap'
import Sidebar from '../components/Sidebar'
import MessageContainer from '../components/MessageContainer'

function Chat() {
  return (
    <Container>
        <Row>
            <Col md={4}> 
                <Sidebar />
            </Col>
            <Col md={8}> 
                <MessageContainer />
            </Col>
        </Row>
    </Container>
    )
}

export default Chat