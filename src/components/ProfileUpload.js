import React,{useState, useEffect} from 'react'
import ReactDOM from 'react-dom';
import Modal from 'react-modal';

  
Modal.setAppElement('#root');

const ProfileUpload = ({modalIsOpendp,openModaldp,closeModaldp}) => {

    console.log(modalIsOpendp);
    

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


    let subtitle;

    const[imageUrl,setImageUrl]= useState("")
    

    const profilepic = async () => {
       try{
        const upload = await fetch("https://insta-backend-hr3a.onrender.com/uploadProfilePic",{
          method:"PUT",
          headers:
          {
            "content-Type":"application/json",
            "Authorization":"Bearer " + localStorage.getItem("token")
          },
          body:JSON.stringify({
              "pic":imageUrl
          })
        }
          
        )
        const data=await upload.json()
        console.log(data);
        

       }catch(err){

       }
   
    }



   
    
  return (
    <div>
      
      <Modal
        isOpen={modalIsOpendp}
      
        onRequestClose={closeModaldp}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Hello</h2>
        <div>
            <input id="Profile Pic"  value={imageUrl} onChange={(e) => {
                    setImageUrl(e.target.value)}}></input>
            <button onClick={profilepic}>Upload Picture</button>
            
           
        </div>
        <button onClick={closeModaldp}>close</button>

       
        
        <div>I am a modal</div>
      </Modal>
    </div>
  )
}

export default ProfileUpload
