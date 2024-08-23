import React,{useEffect,useState} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import CreatePost from './CreatePost';
import PostList from './PostList';
import { Link } from 'react-router-dom';
import LogOut from './LogOut';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


//import profile from '/src/assets/images/profile.jpg';

const Home = ({url}, {setIsLogin}) => {


  const [newPost, setNewPost] = useState(true)
  const [logOutModal, setLogOutModal] = useState(false)
  const openLogOutModal = () => setLogOutModal(true)
  const closeLogOutModal =() => setLogOutModal(false)

// const fetchAllPost = async () => {
//   try{
//     const response = await fetch("url", {
//       method:"GET",
//       headers:{
//         "Content-Type":"application/json",
//         "Authorization":"Bearer" + localStorage.getItem("token")
//       },
//     })
//     const data = await response.json();
//     console.log(data);
//     setPosts(data)
//   }
//   catch(err) {

//   }
// }






 


function updateNewPost(){
   setNewPost((prev)=> !prev)
} 



  const [posts, setPosts] = useState([]);



//  useEffect(()=>{
//     const storedPosts = localStorage.getItem("posts");
//     console.log(storedPosts);


//     const parsedPosts = JSON.parse(storedPosts);
//     console.log(parsedPosts);
//     setPosts(parsedPosts);
//  },[newPost]);


    let subtitle;
    const [modalIsOpen, setIsOpen] = React.useState(false);


    const customStyles = {
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
        },
      };
  
    function openModal() {
      setIsOpen(true);
    }
  
    function afterOpenModal() {
      // references are now sync'd and can be accessed.
      subtitle.style.color = '#f00';
    }
  
    function closeModal() {
      setIsOpen(false);

    }




  return (

    <div>
      <nav className="navbar">
        <div className='left__items'>
        <div className="navbar__logo">
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/2560px-Instagram_logo.svg.png" alt="Instagram Logo" />
      </div>
        </div>
      
      <div className="navbar__search">
        <input type="text" placeholder="Search" />
      </div>

      <div className='right__items'>
      <div className="navbar__icons">

        <i className="fas fa-home" ></i>
      

        <i onClick={openModal} className="fas fa-plus-square"></i>


        <i className="fas fa-heart"></i>

        <i onClick={openLogOutModal} className="fa-solid fa-right-from-bracket"></i>
       
        <Link to={"/profile"}>
        <i style={{"color":"black"}} className="fas fa-user" > </i>
        </Link>

        
       
      </div>
      </div>
      
    </nav>

<div className="home-posts">


<PostList newPost = {newPost} url="https://insta-backend-hr3a.onrender.com/allposts?limit=10"></PostList>

</div>
    


<CreatePost modalIsOpen={modalIsOpen} setIsOpen={setIsOpen}></CreatePost>

<LogOut logOutModal={logOutModal} closeLogOutModal={closeLogOutModal} setIsLogin={setIsLogin}></LogOut>


    </div>


    
  )
}

export default Home
