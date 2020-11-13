import React, { useContext, useState } from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { UserContext } from '../../App';
import Icon from '../../Icon/google.png';
import fb from '../../Icon/fb/fb.png'

import './Login.css'
import { Link, useHistory, useLocation } from 'react-router-dom';

const Login = () => {
  const history = useHistory();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/" } };
    const [newUser, setNewUser] = useState(false)
    const [logInUser, setLogInUser] = useContext(UserContext);
    if(firebase.apps.length===0){
        firebase.initializeApp(firebaseConfig);
    }
   
     const handleGoogleSineIn =()=>{
            var provider = new firebase.auth.GoogleAuthProvider();
            firebase.auth().signInWithPopup(provider).then(function(result) {
             
                var token = result.credential.accessToken;
                
                const user= result.user;
                const {displayName, email, photoURL, phoneNumber}= user;
                const signInUser ={
                  isSignIn: true,
                  name: displayName,
                  email: email, 
                  photo: photoURL, 
                  number:phoneNumber}
                setLogInUser(signInUser)
                history.replace(from)
                
              
                }).catch(function(error) {
                  
                var errorCode = error.code;
                var errorMessage = error.message;
                
                var email = error.email;
               
                var credential = error.credential;
             
                });
        }
        const handleGoogleSineOut=() => {
          firebase.auth().signOut().then(function() {
            const signOutUser ={
                  isSignIn: false,
                  name: '',
                  email: '', 
                  photo: '', 
                  number:'',
                }
                setLogInUser(signOutUser)
            
            }).catch(function(error) {
              
            });
        }

const handleBlur= (event) =>{
  let isFormValid = true;
  if (event.target.name === 'email') {
    isFormValid = /\S+@\S+\.\S+/.test(event.target.value);
}
  if (event.target.name === 'password') {
    const isPasswordValid = event.target.value.length >= 8;
    const isPasswordNumber = /^[0-9]|[0-9][0-9]$/.test(event.target.value);
    isFormValid= isPasswordValid && isPasswordNumber;
}
  if (isFormValid) {
      const newUserInfo ={...logInUser};
      newUserInfo[event.target.name] = event.target.value;
      setLogInUser(newUserInfo);
  }
}
const handleSubmit=(event) =>{
    if (newUser && logInUser.email && logInUser.password) {
              firebase.auth().createUserWithEmailAndPassword(logInUser.email, logInUser.password)
              .then(res=>{
                const newUserInfo ={...logInUser};
                newUserInfo.error = '';
                newUserInfo.success = true;
                setLogInUser(newUserInfo);
                userName(logInUser.name)
                history.replace(from)
                
                
                                              
              })
              .catch(error=>{
               
                const newUserInfo ={...logInUser};
                newUserInfo.error = error.message;
                newUserInfo.success = false;
                setLogInUser(newUserInfo);

});

    }
    if (!newUser && logInUser.email && logInUser.password) {
      firebase.auth().signInWithEmailAndPassword(logInUser.email, logInUser.password)
      .then(res=>{
        const newUserInfo ={...logInUser};
                newUserInfo.error = '';
                newUserInfo.success = true;
                setLogInUser(newUserInfo);
                
      })
      .catch(error=> {
        const newUserInfo ={...logInUser};
                newUserInfo.error = error.message;
                newUserInfo.success = false;
                setLogInUser(newUserInfo);
});  
    }
    event.preventDefault();     
}

const userName = (name, number) =>{
  var user = firebase.auth().currentUser;

user.updateProfile({
  displayName: name,
  
}).then(function() {
 
}).catch(function(error) {
  
});
}

const handleFbSineIn=() => {
      var fbProvider = new firebase.auth.FacebookAuthProvider();
      firebase.auth().signInWithPopup(fbProvider).then(function(result) {
      // var user = result.user;
       const user= result.user;
                const {displayName, email, photoURL, phoneNumber}= user;
                const signInUser ={
                  isSignIn: true,
                  name: displayName,
                  email: email, 
                  photo: photoURL, 
                  number:phoneNumber}
                setLogInUser(signInUser)
                console.log(user)
                history.replace(from)
                
      // ...
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.error(errorMessage)
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
}
    return (
       
    <Container className="w-50 inputForm pt-4 pb-4 text-center">
      
        <Form className="">
  <Form.Group as={Row} controlId="formPlaintextEmail">
   
    <Col sm="10">
      <Form.Control onBlur={handleBlur} name='email' placeholder="User email" required />
    </Col>
  </Form.Group>
   {
     newUser&&<div>
       <Form.Group as={Row} controlId="formPlaintextEmail">
   
    <Col sm="10">
      <Form.Control onBlur={handleBlur} name='name' placeholder="First name" required />
    </Col>
  </Form.Group>
  <Form.Group as={Row} controlId="formPlaintextEmail">
   
    <Col sm="10">
      <Form.Control onBlur={handleBlur} name='lastName' placeholder="Last name" required />
    </Col>
  </Form.Group>
  <Form.Group as={Row} controlId="formPlaintextEmail">
   
    <Col sm="10">
      <Form.Control onBlur={handleBlur}name ='number' placeholder="Phone Number" required />
    </Col>
  </Form.Group>
     </div>
   }
    <Form.Group as={Row} controlId="formPlaintextPassword">
    
    <Col sm="10">
      <Form.Control onBlur={handleBlur} name='password' type="password" placeholder="Password" required />
    </Col>
    

  </Form.Group>
  {
    newUser&&<Form.Group as={Row} controlId="formPlaintextPassword">
    
    <Col sm="10">
      <Form.Control onBlur={handleBlur} name='password' type="password" placeholder="Confirm Password" required />
    </Col>
    

  </Form.Group>
}
  <p style={{color:'red'}}>{logInUser.error}</p>
    {
      logInUser.success &&<p style={{color:'green'}}>User {newUser?'created':'log in'} successfully</p>
    }
{
!newUser&&<div>
  <div className="row">
  <Col sm="7">
<form className="form-check pl-4">
  <input className="form-check-input" type="checkbox" value="" id="defaultCheck1"/>
  <label className="form-check-label" for="defaultCheck1">
    Remember me
  </label>
</form>
</Col>
<Col sm="5">
<Link to="">forgot password</Link>
</Col>

</div>


<Button className="btn btn-warning pl-5 pr-5 pt-2 pb-2" onClick={handleSubmit}>Login</Button>
<p>Don't have account? <Link onClick={()=>setNewUser(!newUser)}>create account</Link></p>
</div>
}
{
newUser&&<div>
  <Button className="btn btn-warning pl-5 pr-5 pt-2 pb-2" onClick={handleSubmit}>Create account</Button>
<p>Allready have an account <Link onClick={()=>setNewUser(!newUser)}>Log in</Link></p>
</div>
}

</Form>



  




<div className="row"><hr/><h2>or</h2><hr/></div>
       
        {
          logInUser.isSignIn ? <Button className="button-icon bg-light text-dark" onClick={handleGoogleSineOut}><img className="mr-3" src={Icon} alt=""/>Google Sign Out</Button> : <Button className="button-icon bg-light text-dark" onClick={handleGoogleSineIn}><img className="mr-3" src={Icon} alt=""/>Continue With Google</Button>
        }
        <br/>
        <br/>
        
        {
          logInUser.isSignIn ? <Button onClick={handleFbSineIn} className="button-icon bg-light text-dark"><img className="mr-3" src={fb}alt=""/>Facebook Sign Out</Button> : <Button onClick={handleFbSineIn} className="button-icon bg-light text-dark"><img className="mr-3" src={fb}alt=""/>Continue With Facebook</Button>
        }
  
    </Container>
    );
};

export default Login;