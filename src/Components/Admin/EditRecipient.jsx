import React, { useContext, useState } from 'react'
import { AiFillEdit } from "react-icons/ai";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {  updateRecipientAPI } from '../../Services/allAPIs';
import toast, { Toaster } from 'react-hot-toast';
import  { editRecipientResponseContext } from '../../ContextAPI/ContextShare';

function EditRecipient({recipient}) {
  console.log(recipient);
    
  const {editRecipientResponse, setEditRecipientResponse} = useContext(editRecipientResponseContext)
  
  const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [recipientData,setRecipientData] = useState({
      id:recipient._id,
      fullName:recipient.fullName,
      bloodType:recipient.bloodType,
      phoneNumber:recipient.phoneNumber,
    
    })
    
    
    
   const updateRecipient = async() => {
    const {id,fullName,bloodType,phoneNumber} = recipientData
    const reqBody ={
      fullName,
      bloodType,
      phoneNumber
    }
  const token = sessionStorage.getItem("token");
  const reqHeader={
    "Content-Type":"application/json",
    "Authorization":`Bearer ${token}`
  }
  const result = await updateRecipientAPI(id,reqBody,reqHeader)
  console.log(result);
  if(result.status === 200){
    toast.success("Recipient details updated")
    handleClose()
    setEditRecipientResponse(result.data)
  }
  else{
    alert("Project not updated ")
    setEditRecipientResponse(result.response.data)
  }
  } 
    
    
    return (
        <div>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "45px" }}>
                <AiFillEdit color='#23297A' size={"20px"}  onClick={handleShow}/>
            </div>
            <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Recipient</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <input type="text" className='form-control mb-3' placeholder='Full Name' onChange={e=>setRecipientData({...recipientData,id:e.target.value})} value={recipientData.id} />
          <input type="text" className='form-control mb-3' placeholder='Full Name' onChange={e=>setRecipientData({...recipientData,fullName:e.target.value})} value={recipientData.fullName} />
          <input type="text" className='form-control mb-3' placeholder='Blood Group' onChange={e=>setRecipientData({...recipientData,bloodType:e.target.value})} value={recipientData.bloodType} />
          <input type="text" className='form-control mb-3' placeholder='Phone Number' onChange={e=>setRecipientData({...recipientData,phoneNumber:e.target.value})} value={recipientData.phoneNumber} />

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={updateRecipient}>Update</Button>
       <Toaster/>
        </Modal.Footer>
      </Modal>
        </div>
    )
}

export default EditRecipient