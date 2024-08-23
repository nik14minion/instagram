import React, { useState, useEffect } from "react";
import './Home.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const ProfilePosts = ({likePost, deletePost ,username, profilePic}) => {
  const[newPost,setNewPost] = useState(true)
  const [posts, setPosts] = useState([]);
const [user, setUser] = useState()
 const[profileData,setProfileData]= useState()
 const [comment, setComment] = useState("")
 const [isCommentBox, setIsCommentBox] = useState(false)
  function toggleCommentBox(){
    setIsCommentBox((prev)=>!prev)
}
  

  function updateNewPostValue() {
    setNewPost((prev) => !prev)}


  async function likePost(postId) {
    try{
      const response = await fetch("https://insta-backend-hr3a.onrender.com/like",{
        method:'PUT',
        headers:{
          "content-Type":"application/json",
          "Authorization": "Bearer " + localStorage.getItem("token")},
          body:JSON.stringify({
             postId:postId
          })
      });
     const data = await response.json();
     console.log(data);
     toast.success("Liked Successfully6")
     updateNewPostValue();

    } catch(err) {
        console.log(err);
    }
  }

  async function unlikePost(postId) {
    try {
        const response = await fetch("https://insta-backend-hr3a.onrender.com/unlike",{
            method:"PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
            body:JSON.stringify({
                postId:postId
            })
        });
        const data = await response.json();
        console.log(data);
        toast.success("UnLiked Successfully6")
        updateNewPostValue()

    } catch (err) {
        console.log(err);
    }
}


  const deletePostHandler = async (_id) => {
      try {
      const response = await fetch(`https://insta-backend-hr3a.onrender.com/deletePost/${_id}`, {
        method: 'DELETE',
       headers:{
         "content-Type":"application/json",
         "Authorization": "Bearer " + localStorage.getItem("token"), }
      })
      
      
      const data = await response.json();
      console.log(data);
      
      
    } catch (error) {
      console.error('Error deleting post:', error);
      
    }
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('https://insta-backend-hr3a.onrender.com/myposts', {
          method: "GET",
          headers: {
            "Content-Type":"application/json",
            "Authorization": "Bearer " + localStorage.getItem("token"),
          },
        });

        const data = await response.json();
        console.log(data);
        setPosts(data);
        
      } catch (err) {
        console.error("Failed to fetch posts:", err);
      }
    };

    fetchPosts();
  }, [newPost]);


  async function commentPost(postId) {
    try {
        const response = await fetch("https://insta-backend-hr3a.onrender.com/comment", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify({
                text: comment,
                postId: postId
            })
        });
        const data = await response.json();
        console.log(data);
        toast.success("Comment Successfully")
        setComment("")
        updateNewPostValue()
    } catch (err) {
        console.log(err);
    }
}



  



  return (
    <div className="card-list">
      {posts &&
        posts.map((post, index) => (
          <div className="post-card" key={index}>
            <div className="post-card__header">
              <div className="post-card__avatar">
            
              
              <img className="img-fluid" style={{borderRadius:"50%"}} src={profilePic} alt="User"/>

              </div>
              <span className="post-card__username">{username}</span>
            </div>

            <div key={index} className="post">
                        <img src={post.photo} alt={`Post ${index + 1}`} />
            </div>
            <div className="post-card__footer">
              <div className="post-card__actions">


              <div style={{display:"flex", alignItems:"center"}}>
                <span style={{"marginRight":"5px"}}>{post.likes.length || 0}</span>
                  
                {post.likes.includes(localStorage.getItem("userId")) ? <i className="fa-solid fa-heart" style={{color:"#ff0000"}} onClick={()=>unlikePost(post._id)}></i> :    <i className="fa-regular fa-heart" onClick={() => likePost(post._id)}></i>
              }

              </div>
           
             
              
              <span style={{ marginRight: "0px" }}>{post.comments.length}</span>
                <i onClick={toggleCommentBox} className="fas fa-comment"></i>
                <i className="fas fa-paper-plane"></i>
              </div>
              <span className="post-card__likes">
              
              </span>

              <button
                style={{ width: "60px", marginLeft: "0px" ,height:'30px', fontSize: '12px', paddingBottom:'1.5rem', paddingTop:'0.5rem', borderRadius:'3rem'}}
                className="btn btn-danger"
                onClick={() => deletePostHandler(post._id)}
              >
                Delete
              </button>
              <strong><span>{post.postedBy.name}</span></strong> 
              <p className="class-test" style={{marginBottom:'1px'}}>{post.body}</p>

              {/* comment box */}

<div className={isCommentBox ?'comment-box-open':"comment-box-hide"}
  style={{
    height: "60px", 
    border: "1px solid #ccc",
    overflowY: "scroll", 
    padding: '2px', 
    paddingBottom: '2px', 
    marginLeft: '2px', 
    borderRadius: '0.5rem', 
    backgroundColor: '#CCE3DE', 
    width: '70%',
  }}
>
  {post.comments.map((commentDetail) => (
    <div 
      key={commentDetail._id} 
      style={{ 
        display: "flex", 
        alignItems: "center", 
        gap: "10px", 
        padding: "10px",}}>
          
      <p style={{fontWeight:'bold'}}>{commentDetail.postedBy ? commentDetail.postedBy.name : "Unknown User"}</p>
      <p>{commentDetail.comment}</p>
      <style jsx>{`
  
            div::-webkit-scrollbar {
                width: 6px; }

            div::-webkit-scrollbar-thumb {
            background-color: grey;
            border-radius: 10px; }

            div::-webkit-scrollbar-thumb:hover {
            background-color: #555;}`}</style>
    </div>
  ))}
</div>





      <div className="comment_box" style={{display: ''}}>
        <input className="form-group" type='text'  placeholder="Enter your comment"  value={comment} onChange={(e) => setComment(e.target.value)}  style={{ height:'40%',width: '80%', padding: '4px', fontSize: '14px', border:'none' }}>
        </input>
      

      {/* comment-button */}
      <button type="submit" className="btn btn-primary" onClick={() => commentPost(post._id)} style={{ marginTop: '2px', padding: '5px 20px', fontSize: '12px', marginLeft:'2px', height:'50%', width:'22%', borderRadius:'3rem', backgroundColor:'#6B9080'}}>Add Comment</button>
      </div>
            
            </div>
          </div>
        ))}

<ToastContainer position="top-center"/>
    </div>
  );
};

export default ProfilePosts;
