import React,{useState} from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');



const CreatePost = ({modalIsOpen,setIsOpen}) => {
  const [newPost, setNewPost] = useState(true)
       
  function updateNewPost(){
       setNewPost((prev)=> !prev)} 


       const[imageUrl,setImageUrl]= useState("")
       const[caption,setCaption]=useState("")

  function submitHandler(e){
       e.preventDefault()
     //console.log(imageUrl,caption)
       addPost()
       setCaption("")
       setImageUrl("")
       updateNewPost()}

   const addPost=async()=>{
      try{
         const response = await fetch("https://insta-backend-hr3a.onrender.com/createPost",{
          method:"POST",
          headers:{
            "content-Type":"application/json",
            "Authorization":"Bearer " + localStorage.getItem("token")
            
          },
          body:JSON.stringify({
             "body":caption,
             "pic":imageUrl
          })

         })
         
     const data=await response.json()
     console.log(data);

     closeModal()
     updateNewPost()
     }
     catch(err)
     {

      }
  }

  


    let subtitle;
    
    


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


      <Modal
        isOpen={modalIsOpen}
        //onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal">
        <h2 style={{"fontFamily":"inherit","color":"grey","fontSize":"18px"}}>Upload Post!</h2>

       
       <div className='post-form'>

       <form onSubmit={submitHandler} style={{"backgroundColor":"#CBC3E3"}} className="form-container">
            <div className="form=group">
                <label htmlFor="imageUrl">Image Url</label>
                
                 <input id="imageUrl" value={imageUrl} onChange={(e) =>
                {setImageUrl(e.target.value)}} type="text" className="form-control" />
           </div>

            <div className="form-group">
                <label htmlFor="caption">Caption</label>

                <input id="caption"  value={caption} onChange={(e) => {
                    setCaption(e.target.value)}} type="text" className="form-control"></input>
            </div>


            <button style={{"color":"white", "padding":"5px", "backgroundColor":"#8a3ab9","margin":"6px"}} className="btn btn-primary" type="submit">Upload Post</button>

      </form>

      </div>


        <button style={{"width":"60px","height":"40px","background-color":"rgb(138, 58, 185)"}} className='btn btn-primary' onClick={closeModal}>close</button>
        
      </Modal>

      
      
    </div>
  )
}

export default CreatePost
