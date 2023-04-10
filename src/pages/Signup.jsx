import React, {useState} from 'react';
import { Container, Row, Col, Form, FormGroup } from 'reactstrap';
import Helmet from '../components/Helmet/Helmet';
import '../styles/signup.css';
import { Link } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile} from "firebase/auth";
import { auth } from '../firebase.config';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'; 
import {storage} from '../firebase.config';
import {toast} from 'react-toastify';
import {setDoc, doc} from 'firebase/firestore'; 
import { db } from '../firebase.config';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [file, setFile] = useState(null);
  const [username, setUsername]=useState('');
  const [email, setEmail]=useState('');
  const [password, setPassword]= useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()
  const signup = async(e)=>{
    e.preventDefault()
    setLoading(true);
    try{

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
        );
        const user = userCredential.user;
        const storageRef = ref(storage, `images/${Date.now() + username}`)
        const uploadTask = uploadBytesResumable(storageRef, file)

        uploadTask.on((error)=>{
          toast.error(error.message)
        }, () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => {
            await updateProfile(user,{
              displayName: username,
              photoURL: downloadURL,
            });
            await setDoc(doc(db,"users",user.uid),{
              uid: user.uid,
              displayName: username,
              email,
              photoURL: downloadURL
            });
          });
        }
      );
      setLoading(false)
      toast.success('Account created');
      navigate('/login')
      
    }catch(error){
      setLoading(false)
      toast.error('Something went wrong');
    }
  }
  return (
    <Helmet title="signup">
      <section>
        <Container>
          <Row>
          {
            loading? <Col lg='12' className='text-center'><h5 className='fw-bold'>Loading.....</h5></Col>: <Col lg='6' className='m-auto text-center'>
              <h3 className="fw-bold mb-4">Signup</h3>
              <Form className='auth_form' onSubmit={signup}>
                <FormGroup className='form_group'>
                  <input type='text' placeholder='Username' value={username}
                  onChange={e=> setUsername(e.target.value)}/>
                </FormGroup>
                <FormGroup className='form_group'>
                  <input type='email' placeholder='Enter your email' value={email}
                  onChange={e=> setEmail(e.target.value)}/>
                </FormGroup>
                <FormGroup className='form_group'>
                  <input type='password' placeholder='Enter your password' value={password}
                  onChange={e=> setPassword(e.target.value)}/>
                </FormGroup>
                <FormGroup className='form_group'>
                  <input type='file' onChange={e=> setFile(e.target.files[0])}/>
                </FormGroup>
                <button type='submit' className='buy_btn auth_btn'>Create an account</button>
                <p>Already have an account? <Link to='/login'>Login</Link> </p>
              </Form>
            </Col>
          }
          </Row>
        </Container>
      </section>
    </Helmet>
  )
}

export default Signup;
