import React, {useState} from 'react';
import { Container, Row, Col, Form, FormGroup } from 'reactstrap';
import Helmet from '../components/Helmet/Helmet';
import '../styles/login.css';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import {auth} from "../firebase.config";
import {toast} from 'react-toastify';

const Login = () => {
  const [email, setEmail]=useState('');
  const [password, setPassword]= useState('');
  const [loading, setLoding] = useState(false);
  const navigate = useNavigate();
  const signIn = async(e)=>{
    e.preventDefault();
    setLoding(true)
    
    try{
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      const user = userCredential.user
      console.log(user)
      setLoding(false)
      toast.success('Successfully logged in')
      navigate('/checkout')

    }catch(error){
      setLoding(false)
      toast.error("Something went wrong");
    }
  }
  return (
    <Helmet title="login">
      <section>
        <Container>
          <Row>
           {
            loading? <Col lg='12' className='text-cnter'><h5 className='fw-bold'>Loading......</h5></Col> :  <Col lg='6' className='m-auto text-center'>
            <h3 className="fw-bold mb-4">Login</h3>
            <Form className='auth_form' onSubmit={signIn}>
              <FormGroup className='form_group'>
                <input type='email' placeholder='Enter your email' value={email}
                onChange={e=> setEmail(e.target.value)}/>
              </FormGroup>
              <FormGroup className='form_group'>
                <input type='password' placeholder='Enter your password' value={password}
                onChange={e=> setPassword(e.target.value)}/>
              </FormGroup>
              <button type='submit' className='buy_btn auth_btn'>Login</button>
              <p>Don`t have an account? <Link to='/signup'>Create an account</Link> </p>
            </Form>
          </Col>
           }
          </Row>
        </Container>
      </section>
    </Helmet>
  )
}

export default Login
