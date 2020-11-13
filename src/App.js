import React, { createContext, useState } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Header from './components/Header/Header';
import Home from './components/Home/Home';
// import Booking from './components/Booking/Booking';
import Login from './components/Login/Login';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import Contact from './components/Contact/Contact';
import NotFound from './components/NotFound/NotFound';
import fakeData from './fakeData/fakeData';
import Hotel from './components/Hotel/Hotel';



export const JourneyContext = createContext();
export const BookingContext = createContext();
export const UserContext = createContext();

function App() {
  const [selectedPlace, setSelectedPlace] = useState(fakeData[0].place);
  const [proceedToBooking, setProceedToBooking] = useState(false);
  const [logInUser, setLogInUser]=useState({
    isSignIn: false,
    name: '',
    email: '',
    photo: '',
    number:'',
    password: '',
    error: '',
    success: false,
  });
  return (
      <JourneyContext.Provider value={[selectedPlace, setSelectedPlace]} className="app">
      <BookingContext.Provider value={[proceedToBooking, setProceedToBooking]}>
    <UserContext.Provider value={[logInUser, setLogInUser]}>
      
      
      <Router>
        <Header></Header>
        <Switch>
          <Route  path="/contact">
            <Contact/>
          </Route>
          <Route path="/login">
            <Login></Login>
          </Route>
          <PrivateRoute  path="/Hotel">
            <Hotel/>
          </PrivateRoute>
         
           <Route exact  path="/home">
            <Home/>
          </Route>
           
           <Route exact  path="/">
            <Home/>
          </Route>
          <Route path="*">
            <NotFound></NotFound>
          </Route>
        </Switch>
    </Router>
   
    </UserContext.Provider>
    </BookingContext.Provider>
    </JourneyContext.Provider>
  );
}

export default App;
