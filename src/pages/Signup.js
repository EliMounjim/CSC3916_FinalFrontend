import React, { useState } from 'react'
import { Row, Col, Container, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Signup.css";
import botProfilePic from "../assets/profile-pic.jpg"
import { useSignupUserMutation } from '../services/appApi';


function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signupUser, { isLoading, error }] = useSignupUserMutation();

  //img
  const [image, setImage] = useState(null);
  const [uploadingImage, setUploadImage] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);


  function validateImg(e) {
    const file = e.target.files[0];
    if (file.size >= 1048576) {
      return alert("Max file size is 1MB");
    } else {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  }
  async function uploadImage() {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "iw53htxb");
    try {
      setUploadImage(true);
      let res = await fetch("https://api.cloudinary.com/v1_1/djp5sgihe/image/upload", {
        method: "post",
        body: data,
      });
      const urlData = await res.json();
      setUploadImage(false);
      return urlData.url;
    } catch (error) {
      setUploadImage(false);
      console.log(error);
    }
  }

  async function handleSignup(e) {
    e.preventDefault();
    if (!image) return alert("Please upload your profile picture");
    const url = await uploadImage(image);
    console.log(url);
    //signup user
    signupUser({ name, email, password, picture: url }).then(({ data }) => {
      if (data) {
        console.log(data);
      }
    });
  }

  return (
    <Container>
      <Row>
        <Col md={5} className="signup__bg"></Col>
        <Col md={7} className="d-flex align-items-center justify-conttent-center flex-direction-column">
          <Form style={{ width: "80%", maxWidth: 500 }} onSubmit={handleSignup}>
            <h1 className="text-center">Create account</h1>
            <div className="signup-profile-pic__container">
              <img src={imagePreview || botProfilePic} className="signup-profile-pic" />
              <label htmlFor="image-upload" className="image-upload-label">
                <i className="fas fa-plus-circle add-picture-icon"></i>
              </label>
              <input type="file" id="image-upload" hidden accept="image/png, image/jpeg" onChange={validateImg} />
            </div>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Enter your Name" onChange={(e) => setName(e.target.value)} value={name} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasic}Email">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} value={email} />
              <Form.Text className="text-muted">We'll never share your email with anyone else.</Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={password} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Agree to Terms and Conditions" />
            </Form.Group>
            <Button variant="primary" type="submit">
              {uploadingImage ? 'Signing up ...' : "Sign Up"}
            </Button>
            <div className="py-4">
              <p className="text-center">
                Already Have an Account? <Link to="/login"> Login Now</Link>
              </p>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

export default Signup