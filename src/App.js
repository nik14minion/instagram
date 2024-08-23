import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import PostList from './components/PostList';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import { useState } from 'react';
import Home from './components/Home';
import { BrowserRouter, Routes, Route ,Navigate} from 'react-router-dom';
import ProfilePage from './components/ProfilePage';
import OtherProfiles from './components/OtherProfiles';



function App() {

   const[isLogin, setIsLogin]= useState(!!localStorage.getItem("token"));
   // console.log(isLogin);
 
const [newPost, setNewPost] = useState(true)


function updateNewPost(){
   setNewPost((prev)=> !prev)
} 



  




  return (
   <BrowserRouter>
   <div>
   <Routes>
   
      <Route path='/signin' element={isLogin?<Navigate to={"/home"}></Navigate>: <SignIn setIsLogin={setIsLogin}/>}></Route>


      <Route path='/signup' element={ <SignUp/>}></Route>
      
     
      <Route path='/post' element={ <PostList  newPost = {newPost} /> }></Route>


      <Route path='/home' element={isLogin? <Home  setIsLogin={setIsLogin} url="https://insta-backend-hr3a.onrender.com/allposts?limit=10"></Home> :<Navigate to={"/signin"}></Navigate>}></Route>


      <Route path='/profile' element={ <ProfilePage></ProfilePage> }></Route>

      <Route path='/user' element={ <OtherProfiles></OtherProfiles> }></Route>

      </Routes>
   </div> 
    
    
   </BrowserRouter>
   
  );
}

export default App;
