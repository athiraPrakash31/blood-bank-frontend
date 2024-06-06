import React, { useContext, useState } from 'react'
import { AiFillEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { updateDonorAPI } from '../../Services/allAPIs';
import toast from 'react-hot-toast';
import { editDonorResponseContext } from '../../ContextAPI/ContextShare';

function EditDonor({donor}) {
  console.log(donor);
  const {editDonorResponse,setEditDonorResponse} = useContext(editDonorResponseContext)  
  const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [donorData,setDonorData]= useState({
      id:donor._id,
      fullName:donor.fullName,
      bloodType:donor.bloodType,
      phoneNumber:donor.phoneNumber,
    })


    const updateDonor = async()=>{
      const {id,fullName,bloodType,phoneNumber} = donorData
      const reqBody = {
        fullName,
        bloodType,
        phoneNumber
      }
      const token = sessionStorage.getItem("token");
      const reqHeader={
        "Content-Type":"application/json",
        "Authorization":`Bearer ${token}`
      }
      const result = await updateDonorAPI(id,reqBody,reqHeader)
      console.log(result);
      if(result.status ===200){
        toast.success("Donor details updated")
        handleClose()
        setEditDonorResponse(result.data)
      }
      else{
      toast.error("Donor detail not updated")
      setEditDonorResponse(result.response.data)
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
          <Modal.Title>Edit Donor</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input type="text" className='form-control mb-3' placeholder='Id'  onChange={e=>setDonorData({...donorData,id:e.target.value})} value ={donorData.id}/>
          <input type="text" className='form-control mb-3' placeholder='Full Name' onChange={e=>setDonorData({...donorData,fullName:e.target.value})} value ={donorData.fullName}/>
          <input type="text" className='form-control mb-3' placeholder='Blood Group' onChange={e=>setDonorData({...donorData,bloodType:e.target.value})} value ={donorData.bloodType} />
          <input type="text" className='form-control mb-3' placeholder='Phone Number' onChange={e=>setDonorData({...donorData,phoneNumber:e.target.value})} value ={donorData.phoneNumber}/>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={updateDonor}>Update</Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default EditDonor