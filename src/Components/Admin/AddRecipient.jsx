import React, { useContext, useEffect, useState } from 'react'
import { IoMdAdd } from "react-icons/io";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import toast, { Toaster } from 'react-hot-toast';
import { addRecipientAPI } from '../../Services/allAPIs';
import { addRecipientResponseContext } from '../../ContextAPI/ContextShare';

function AddRecipient() {
  const { addRecipientResponse, setAddRecipientResponse } = useContext(addRecipientResponseContext)
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [token, setToken] = useState('');
  const [recipientData, setRecipientData] = useState({
    fullName: "",
    bloodType: "",
    phoneNumber: "",
    role:"recipient"
  })
  console.log(recipientData);

  const handleAddRecipient = async () => {
    const { fullName, bloodType, phoneNumber,role } = recipientData

    if (!fullName || !bloodType || !phoneNumber ||!role) {
      toast.error("Please fill all details")
    }
    else {
      const reqBody = {
        fullName,
        bloodType,
        phoneNumber,
        role
      };
      if (token) {
        const reqHeader = {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        };
        
          const result = await addRecipientAPI(reqBody, reqHeader);
          console.log(result);
          if (result.status === 200) {
            toast.success("Recipient added successfully");
            setAddRecipientResponse(result.data);
            handleClose();
            setRecipientData({
              fullName: '',
              bloodType: '',
              phoneNumber: '',
              role:"recipient"
            });
          } else {
            toast.error(result.response.data);
          }
        
        
      }
    }

  }
  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setToken(sessionStorage.getItem("token"))
    }

  }, [])
  return (
    <div>
      <div className='m-4 px-5' style={{ float: "right" }}>
        <button className='btn btn-primary' onClick={handleShow} ><IoMdAdd size={'25px'} />Add Recipient </button>
      </div>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Adding Recipient</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input type="text" className='form-control mb-3' placeholder='Full Name' onChange={e => setRecipientData({ ...recipientData, fullName: e.target.value })} />
          <input type="text" className='form-control mb-3' placeholder='Blood Group' onChange={e => setRecipientData({ ...recipientData, bloodType: e.target.value })} />
          <input type="text" className='form-control mb-3' placeholder='Phone Number' onChange={e => setRecipientData({ ...recipientData, phoneNumber: e.target.value })} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddRecipient}>Add</Button>
          <Toaster />
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default AddRecipient