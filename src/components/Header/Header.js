import React, { useContext } from 'react';
import './Header.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Form, FormControl, Button, Container } from 'react-bootstrap';
import image from '../../image/Logo.png'
import { UserContext } from '../../App';
import { Link } from 'react-router-dom';
import * as firebase from "firebase/app";
import "firebase/auth";

const Header = () => {
    const [logInUser, setLogInUser] = useContext(UserContext);

const handleSignOut = ()=>{
  firebase.auth().signOut().then(function() {
      const signOutUser ={
                  isSignIn: false,
                  name: '',
                  email: '', 
                  photo: '', 
                  number:'',
                }
                setLogInUser(signOutUser)
  // Sign-out successful.
}).catch(function(error) {
  // An error happened.
});
}
    return (
       
    <div className="navbar-nav bg-dark">
        <Container className="row bg-dark m-auto">
        <Link className="col-md-3 navbar-brand" href="/home"><img className="text-light text-dark w-50" src={image} alt=""/></Link>
        
        <div className="NavBarMenu">
            <Link to="/Home" className="text-light NavMenuBar ">News</Link>
            <Link to="/hotel" className="text-light NavMenuBar ">Destination</Link>
            <Link to="/home" className="text-light NavMenuBar ">Blog</Link>
            <Link to="/contact" className="text-light NavMenuBar ">Contact</Link>
            {/* <Link to="/login" className=""><Button  variant="warning">Log In</Button></Link> */}
             {
                        logInUser.isSignIn ?<Link onClick={handleSignOut} className=""><Button  variant="warning">Log Out</Button></Link>
                            : <Link to="/login" className=""><Button  variant="warning">Log In</Button></Link>
                    }
            
    </div>
        <p className="text-light pl-3 pt-3">{logInUser.name}</p>
        
  </Container>
    </div>
  
    );
};

export default Header;