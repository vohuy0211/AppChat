import React, { useState } from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBInput,
  MDBIcon,
}
  from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../apps/reducers/UserSlice';

function Register() {

  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({});
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    if (e.target.name === "confirmPassword") {
      if (e.target.value === inputValue.password) {
        setErrors({});
      }
    }
    setInputValue({
      ...inputValue,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    console.log("haha");
    e.preventDefault();

    const newErrors = {};
    if (!inputValue.username) {
      newErrors.username = "Vui lòng nhập tên người dùng";
    }
    if (!inputValue.email) {
      newErrors.email = "Vui lòng nhập email";
    }
    if (!inputValue.password) {
      newErrors.password = "Vui lòng nhập mật khẩu";
    }
    if (!inputValue.confirmPassword) {
      newErrors.confirmPassword = "Vui lòng xác nhận mật khẩu";
    }
    if (inputValue.password !== inputValue.confirmPassword) {
      newErrors.confirmPassword = "Mật khẩu không trùng nhau";
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    try {
      const { confirmPassword, ...payload } = inputValue;
      console.log(inputValue);
      await dispatch(registerUser(payload)).unwrap();
      navigate("/Login");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <MDBContainer fluid>
      <MDBCard className='text-black m-5' style={{ borderRadius: '25px' }}>
        <MDBCardBody>
          <MDBRow>
            <form onSubmit={handleSubmit}>
              <MDBCol md='10' lg='6' className='order-2 order-lg-1 d-flex flex-column align-items-center'>
                <p classNAme="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>
                <div className="d-flex flex-row align-items-center mb-4 ">
                  <MDBIcon fas icon="user me-3" size='lg' />
                  <MDBInput label='Your Name' id='form1' type='text' className='w-100' name="username" onChange={handleInputChange} />
                </div>
                {errors.username && <span className="error">{errors.username}</span>}
                <div className="d-flex flex-row align-items-center mb-4">
                  <MDBIcon fas icon="envelope me-3" size='lg' />
                  <MDBInput label='Your Email' id='form2' type='email' name="email" onChange={handleInputChange} />
                </div>
                {errors.email && <span className="error">{errors.email}</span>}
                <div className="d-flex flex-row align-items-center mb-4">
                  <MDBIcon fas icon="lock me-3" size='lg' />
                  <MDBInput label='Password' id='form3' type='password' name="password" onChange={handleInputChange} />
                </div>
                {errors.password && <span className="error">{errors.password}</span>}
                <div className="d-flex flex-row align-items-center mb-4">
                  <MDBIcon fas icon="key me-3" size='lg' />
                  <MDBInput label='Repeat your password' id='form4' type='password' name="confirmPassword" onChange={handleInputChange} />
                </div>
                {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
                <MDBBtn className='mb-4' size='lg' type='submit'>Register</MDBBtn>
              </MDBCol>
            </form>
            <MDBCol md='10' lg='6' className='order-1 order-lg-2 d-flex align-items-center'>
              <MDBCardImage src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp' fluid />
            </MDBCol>
          </MDBRow>
        </MDBCardBody>
      </MDBCard>

    </MDBContainer>
  );
}

export default Register;
