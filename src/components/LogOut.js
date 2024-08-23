import React,{useState, useEffect} from 'react'
import Modal from 'react-modal';

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
 Modal.setAppElement('#root');


export default function LogOut ({logOutModal, closeLogOutModal, setIsLogin}) {

  const logOutUser = () => {
    localStorage.removeItem("token");
    setIsLogin()
  }
  
  // setIsLogin(false)


  return (
    <div>
      <Modal
        isOpen={logOutModal}
        onRequestClose={closeLogOutModal}
        style={customStyles}>
          <div>
              <h2>Confirm Logout</h2>
              <p>Do you want to LogOut?</p>

              <button style={{ background: 'red', border: 'none', padding: "5px 10px", color: '#fff', borderRadius: '5px', fontSize: "16px" }} onClick={logOutUser} >Confirm</button>
              
              <button style={{ background: '#fff', border: 'none', padding: "5px 10px", color: 'black', borderRadius: '5px', boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px", marginLeft: "10px", fontSize: "16px" }} onClick={closeLogOutModal}>Cancel</button>

          </div>
      
       
      </Modal>
    </div>
  )


}
