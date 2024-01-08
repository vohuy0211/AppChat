import React, { useEffect, useState } from 'react';
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
import { handleLogin } from '../../apps/reducers/UserSlice';

function Login() {

  useEffect(() => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  }, []);

  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({});
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    setInputValue({
      ...inputValue,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        email: inputValue.email,
        password: inputValue.password,
      };
      await dispatch(handleLogin(payload)).unwrap();
      navigate("/ChatAll");
    } catch (error) {
      setError("Sai tài khoản hoặc mật khẩu");
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
                <p classNAme="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Log In</p>
                <div className="d-flex flex-row align-items-center mb-4">
                  <MDBIcon fas icon="envelope me-3" size='lg' />
                  <MDBInput label='Your Email' id='form2'
                    type='email'
                    name="email"
                    onChange={handleInputChange} />
                </div>
                <div className="d-flex flex-row align-items-center mb-4">
                  <MDBIcon fas icon="lock me-3" size='lg' />
                  <MDBInput label='Password' id='form3'
                    type='password'
                    name="password"
                    onChange={handleInputChange} />
                </div>
                <MDBBtn className='mb-4' size='lg'>Log In</MDBBtn>
                {error && <div className="text-danger mb-4">{error}</div>}
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

export default Login;
