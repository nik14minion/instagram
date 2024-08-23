import { useEffect, useState } from "react";
import "./SignUp.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import React from 'react'

const SignUp = () => {

  const [email,setEmail]=useState(" ");
  const [name,setName]=useState(" ");
  const [username, setUsername]=useState(" ");
  const [password, setPassword]=useState(" ");


  const navigate = useNavigate() 
  

    async function registerUser(e) {
      e.preventDefault();
        console.log(email,name,username,password);
      


        try{
        const response = await fetch("https://insta-backend-hr3a.onrender.com/signup",{
          method:"POST",
          headers:{
            "Content-Type":"application/json"

          },
          body:JSON.stringify({
            "name":name,
            "userName":username,
            "email":email,
            "password":password
          })
        })

     const data=await response.json()
     console.log(data);
     navigate ("/signin")


        }catch(err) {



        }
      }



  return (
    <div>
      <div className="main">
        <img src="https://1000logos.net/wp-content/uploads/2017/02/Logo-Instagram.png" className="imginsta"  alt=""/>
        <p className="head1">
          Sign up to see photos and videos from your friends
        </p>
        <button id="facebook-btn" className="btn bt-primary">Log in with Facebook</button>

        
        <div style={{ display: "flex", alignItems: "center" }}>
          <hr id="line"></hr> <hr id="line"></hr>
        </div>

        <div className="or">
            <div className="or-line"></div>
            <div>OR</div>
            <div className="or-line"></div>
        </div>

        <input value={email} onChange={(e)=>{setEmail(e.target.value)}} className="input-box" type="text" placeholder="Mobile No or Email"></input>

        <input value={name} onChange={(e)=>{setName(e.target.value)}} className="input-box" type="text" placeholder="Full Name"></input>

        <input value={username} onChange={(e)=>{setUsername(e.target.value)}} className="input-box" type="text" placeholder="UserName"></input>
        
        <input value={password} onChange={(e)=>{setPassword(e.target.value)}} className="input-box" type="text" placeholder="Password"></input>
        <p className="bottom-para">
          People who use our service may have uploaded your contact information
          to Instagram.
          <a>
            <a href=""> Learn More</a>
          </a>
        </p>

        <p className="bottom-para">
          By signing up, you agree to our Terms , Privacy Policy and Cookies
          Policy .
          <a>
            <a href=""> Learn More</a>
          </a>
        </p>
        <button id="signup-btn" onClick={registerUser} className="btn btn-primary">Sign Up</button>
      </div>
      <div id="login">
        <h4 id="have-account">
          Have an account? <Link to={"/signin"}>Log in</Link>
        </h4>
      </div>
    </div>
  );
}

export default SignUp;

  

  





  