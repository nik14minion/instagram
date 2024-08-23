import React, { useEffect, useState } from 'react';
import './ProfilePage.css';
// import PostList from './PostList';
import ProfilePosts from './ProfilePosts';
import { Link } from 'react-router-dom';
import ProfileUpload from './ProfileUpload';

const ProfilePage = () => {
  

  const [modalIsOpendp, setModalIsOpendp] = useState(false);
  function openModaldp() 
  {setModalIsOpendp(true);}

  function closeModaldp() 
  {setModalIsOpendp(false);}
    

const [newPost, setNewPost] = useState(true)
const [user, setUser] = useState()


  function updateNewPost(){
     setNewPost((prev)=> !prev)
  } 
  
    const [posts, setPosts] = useState([]);
  
    const likePostHandler = (index) => {
      const newPosts = [...posts];
      newPosts[index].likes = (newPosts[index].likes || 0) + 1;
      setPosts(newPosts);
      localStorage.setItem("posts", JSON.stringify(newPosts));
    };
  
    const deletePostHandler = (index) => {
      const newPosts = posts.filter((_, i) => i !== index);
      setPosts(newPosts);
      localStorage.setItem("posts", JSON.stringify(newPosts));
    };
     
        
  
  const[profileData,setProfileData]= useState()


  // const [profileData]

    async function ProfilePageHandler(e) {
        e.preventDefault()
    }

    useEffect(()=>{
        const  profile =async ()=>{
    
          try{
    
            const response = await fetch("https://insta-backend-hr3a.onrender.com/user/" + localStorage.getItem("_id"),{
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
        <img onClick={openModaldp} src={profileData.user.Photo} />
        </div>
        <div className="profile-info">
          <h1 className="profile-name">{profileData.user.userName}</h1>
          
          <p className="profile-bio">Life is beautiful!</p>
          <div className="profile-stats">
            <span className="stats-item"><strong>{profileData.post.length}</strong> posts</span>
            <span className="stats-item"><strong>{profileData.user.followers.length}</strong> Followers</span>
            <span className="stats-item"><strong>{profileData.user.following.length}</strong> Following</span>
          </div>

        </div>
   </div>
   }

 {/* Profile Posts */}
    <div className="profile-posts">
        {profileData && 
  <ProfilePosts newPost = {newPost} username={profileData.user.userName} profilePic={profileData.user.Photo} ></ProfilePosts>}
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
  
    <ProfileUpload modalIsOpendp={modalIsOpendp} openModaldp={openModaldp} closeModaldp={closeModaldp}></ProfileUpload>

    </div>



  )
}



export default ProfilePage;
