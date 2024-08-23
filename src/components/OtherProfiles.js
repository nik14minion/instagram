import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


const OtherProfiles = () => {
  

  const [user, setUser] = useState()
  console.log(window.location.search);

  const queryParams = new URLSearchParams(window.location.search)
  const userId = queryParams.get("userId")
    

   const [newPost, setNewPost] = useState(true)


  function updateNewPost(){
     setNewPost((prev)=> !prev)
  } 
  
    const [posts, setPosts] = useState([]);
  
    
        
  
  const[profileData,setProfileData]= useState()


  // const [profileData]

    async function ProfilePageHandler(e) {
        e.preventDefault()
    }

    useEffect(()=>{
        const  profile =async ()=>{
    
          try{
    
            const response = await fetch("https://insta-backend-hr3a.onrender.com/user/" + userId,{
              method:"GET",
              headers:{
                "content-Type":"application/json",
                "Authorization":"Bearer " + localStorage.getItem("token")
                
              },
              
    
             })
             
         const data=await response.json()
         console.log(data);
         setProfileData(data);
         
    
          } catch(err){
    
          }

        }
        profile()
 },[]);
        



  return (
    <div>
      
      <div className="profile-page">
      {/* Profile Header */}

     

     
      {profileData  && <div className="profile-header">
        <div className="profile-pic">
          <img src={profileData.user.Photo} alt="Profile" />
        </div>
        <div className="profile-info">
          <h1 className="profile-name">{profileData.user.userName}</h1>
          
          <p className="profile-bio">Life is beautiful!</p>
          <div className="profile-stats">
            <span className="stats-item"><strong>{""}</strong> Posts</span>
            <span className="stats-item"><strong>{profileData.user.followers.length}</strong> Followers</span>
            <span className="stats-item"><strong>{profileData.user.following.length}</strong> Following</span>
          </div>

        </div>
   </div>
   }

 {/* Profile Posts */}
 <div className='posts'>
           
           

 </div>


    
    </div>


    <div className="sidebar">
      <h2>Instagram</h2>
      <ul className="sidebar-list">
        <li className="sidebar-item">

          <Link to={"/home"}>
          <a href="#home">Home</a>
          </Link>
          
        </li>
        <li className="sidebar-item">
          <a href="#services">Services</a>
        </li>
        <li className="sidebar-item">
          <a href="#about">About</a>
        </li>
        <li className="sidebar-item">
          <a href="#contact">Contact</a>
        </li>
        <li className="sidebar-item">
          <a href="#profile">Profile</a>
        </li>
      </ul>
    </div>
  
 

    </div>



  )
}



export default OtherProfiles;
