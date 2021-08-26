import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import { Redirect } from 'react-router-dom';

function Login(props) {

  const [details, setLoginDetails] = useState({
    username: "",
    password: ""
  });

  function changedName(e){
    setLoginDetails({...details, username: e.target.value});
  }

  function changedPassword(e){
    setLoginDetails({...details, password: e.target.value});
  }

  function logIn(details){
    axios.post("http://localhost:8080/login", details)
    .then((response) => {
      setLoginDetails(()=>({
        ...details,
        resback: response.data,
      }));
      if(response.data === 'Login Successful')
      {
        props.setIsLoggedIn(true);
        props.setUserName(details.username);
      }
    })
    .catch((error) => {
      console.log(error);
    });
  }

  function createAccount(logincredentials){
    axios.post("http://localhost:8080/newaccount", logincredentials)
    .then((response) => 
      setLoginDetails(() => ({
        ...details,
        resback: response.data,
     }))
    )
    .catch((error) => {
      console.log(error);
    });
  }

  if(props.isloggedin === true){
    return(
      <Redirect to = '/todo' />
    )
  }

  else{
    return (
      <div className="background">
        <p>Create your own notes</p>
        <div className = "App">
        <form>
        <input type = "text" placeholder = "UserName" required = "required" onChange = {changedName} />
        <input type = "password" placeholder = "Password" required = "required" onChange = {changedPassword} />
        <button type = "button" onClick = {() => createAccount(details)}>SignUp</button>
        <button type = "button" onClick = {() => logIn(details)}>LogIn</button>
        </form>
        <div>{details.resback}</div>
      </div>
      </div>
    );    
  }
}

export default Login;


