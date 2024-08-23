import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const SignIn = ({setIsLogin}) => {

    const navigate = useNavigate()
   
   const [email, setEmail]=useState(" ")
   const [password, setPassword]=useState(" ")


   async function loginUser(e) {
    e.preventDefault();
     console.log(email,password);
   

   try{
    const response = await fetch ("https://insta-backend-hr3a.onrender.com/signin",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
             

      },
      body:JSON.stringify({
        "email":email,
        "password":password
      })
    })

 const data=await response.json()
 console.log(data);
//  localStorage.setItem('token',data.token)
//  setIsLogin(true)
//  localStorage.setItem("_id",data.user._id)

if (data.token) {
  console.log("Succesful Login")
  localStorage.setItem("token",data.token);
  localStorage.setItem("userId",data.user._id)
  setIsLogin(true)
  navigate("/home")
}

}  catch(err) {
      console.log(err)


    }
  }


  return (
    <div>
      
      <div className="main">
      <img src="https://1000logos.net/wp-content/uploads/2017/02/Logo-Instagram.png" className="imginsta"  alt=""/>
        <input
          value={email} onChange={(e)=>{setEmail(e.target.value)}}
          className="input-box"
          type="text"
          placeholder="Phone number, username, or email"
        ></input>

        <input 
         value={password} onChange={(e)=>{setPassword(e.target.value)}}
        className="input-box" 
        type="text" 
        placeholder="Password"
        ></input>

        <button onClick={loginUser} id="signup-btn" className='btn btn-primary'>Log in</button>
        <div style={{ display: "flex", alignItems: "center" }}>
          <hr id="line"></hr><hr id="line"></hr>
        </div>
        <div id="login">

        <div className="or">
            <div className="or-line"></div>
            <div>OR</div>
            <div className="or-line"></div>
        </div>


        <h4 id="have-account">
          Don't have an account? <Link to={"/signup"}>Sign up</Link>
        </h4>
      </div>
      </div>


    </div>
  )
}

export default SignIn
