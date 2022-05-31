import React from 'react'
import {Form, Button, Col, Row, Container} from 'react-bootstrap'
import './Register.css'
import { Link, useNavigate } from 'react-router-dom'
import maskImg from '../assets/maskImg.jpg'
import {useState} from 'react'
import { useRegisterUserMutation } from '../services/appApi'

function Register() {
const navigate = useNavigate()
const [registerUser, {isLoading, error}] = useRegisterUserMutation()
const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
})
const { firstName, lastName, email, password } = formData;
const onChange = (e) => {
    setFormData((prevState)=> ({
        ...prevState,
        [e.target.name]: e.target.value,
    }))
}
//image upload states

const [image, setImage] = useState(null)
const [uploadingImage, setUploadingImage] = useState(false)
const [imagePreview, setImagePreview] = useState(null)

//set file size limits



const validateImg = (e) => {
    const file = e.target.files[0]
    if(file.size >= 1048576) {
        return alert('image too large')
    }else {
        setImage(file)
        setImagePreview(URL.createObjectURL(file))
    }
}
const uploadImage = async() => {
    const imageData = new FormData()
    imageData.append('file', image)
    imageData.append('upload_preset', 'profilepic')
    try {
        setUploadingImage(true)
        let res = await fetch('http://api.cloudinary.com/v1_1/emash/image/upload', {
            method: 'post',
            body: imageData
        })
        const urlData = await res.json()
        setUploadingImage(false)
        return urlData.url
    } catch (error) {
        setUploadingImage(false)
        console.log(error);
    }
}

const handleRegister = async(e) => {
    e.preventDefault()
    if(!image) {
        return alert('Please set profile picture')
    } else {
        const url = await uploadImage(image)
        console.log(url);
        //register the user
        registerUser({firstName, lastName, email, password, picture: url})
        .then(({data}) => {
            if(data) {
                console.log(data);
                navigate('/chat')
            }
        })
    }
}
  return (
    <Container>
        <Row>
            <Col md={7} className='d-flex align-items-center justify-content-center flex-direction-column'>
              <Form style={{width: "80%", maxWidth: 500}} onSubmit={handleRegister} >
                  <h1 className='text-center'>Create Account</h1>
                  <div className='signup-profile-pic'>
                    <img src={imagePreview || maskImg} className='profile-pic'/>
                    <label htmlFor="image-upload" className='image-upload-label'>
                        <i className='fas fa-plus-circle add-image-icon'></i>
                    </label>
                    <input hidden type="file" id='image-upload' accept='image.jpeg image/png' onChange={validateImg} />
                  </div>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>First Name</Form.Label>
                      <Form.Control type="text" required name='firstName' placeholder="Enter your first name" onChange={onChange} />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Last Name</Form.Label>
                      <Form.Control type="text" required name='lastName' placeholder="Enter your last name" onChange={onChange}/>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Email address</Form.Label>
                      <Form.Control type="email" name='email' placeholder="Enter email" onChange={onChange} required/>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                      <Form.Label>Password</Form.Label>
                      <Form.Control type="password" name='password' placeholder="Password" onChange={onChange} required/>
                  </Form.Group>
                  <Button variant="primary" type="submit">
                      Register
                  </Button>
                  <div className='py-4'>
                        <p className='text-center'>
                            Already have an account? <Link to="/login">Login</Link>
                        </p>
                    </div>
              </Form>
            </Col>
            <Col className='register'></Col>
        </Row>

    </Container>
)
}

export default Register