import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import { IoMdAdd } from "react-icons/io";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { addDonorResponseContext } from '../../ContextAPI/ContextShare';
import { addDonorAPI } from '../../Services/allAPIs';
import toast, { Toaster } from 'react-hot-toast';
function AddDonor() {
  const {addDonorResponse,setAddDonorResponse} = useContext(addDonorResponseContext)
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [token, setToken] = useState('');
  const [donorData,setDonorData]=useState({
    fullName: "",
    bloodType: "",
    phoneNumber: "",
    role:"donor"
  })

  const handleAddDonor = async()=>{
    const {fullName,bloodType,phoneNumber,role} = donorData
    if (!fullName || !bloodType || !phoneNumber ||!role) {
      toast.error("Please fill all details")
    }
    else{
      const reqBody = {
        fullName,
        bloodType,
        phoneNumber,
        role
      };
      if(token){
        const reqHeader = {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        };
        const result = await addDonorAPI(reqBody,reqHeader);
        console.log(result);
        if(result.status ===200){
          toast.success("Donor added Successfully")
          setAddDonorResponse(result.data);
          handleClose()
          setDonorData({
            fullName: '',
            bloodType: '',
            phoneNumber: '',
            role:'donor'
          });
        }
        else{
          toast.error(result.response.data);

        }
      }
    }
  }
  useEffect(()=>{
    if(sessionStorage.getItem("token")){
      setToken(sessionStorage.getItem("token"))
    }
  },[])
  return (
    <div>
        <div className='m-4 px-5' style={{float:"right"}}>
        <button className='btn btn-primary ' onClick={handleShow}><IoMdAdd  size={'25px'} />Add Donor </button>
      </div>
        <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Adding Donor</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input type="text" className='form-control mb-3' placeholder='Full Name' onChange={e => setDonorData({ ...donorData, fullName: e.target.value })}/>
          <input type="text" className='form-control mb-3' placeholder='Blood Group' onChange={e => setDonorData({ ...donorData, bloodType: e.target.value })}/>
          <input type="text" className='form-control mb-3' placeholder='Phone Number'onChange={e => setDonorData({ ...donorData, phoneNumber: e.target.value })} />

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddDonor}>Add</Button>
       <Toaster/>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default AddDonor