import React, { useContext, useEffect, useState } from 'react'
import blood from '../../assets/blood.png'
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,

} from 'mdb-react-ui-kit';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { LuLogOut } from "react-icons/lu";
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { addDonorAPI } from '../../Services/allAPIs';
import { addDonorResponseContext } from '../../ContextAPI/ContextShare';

function Donor() {
  const {addDonorResponse,setAddDonorResponse} = useContext(addDonorResponseContext)
  const [token, setToken] = useState(false)
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
        const reqHeader={
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        };
        const result = await addDonorAPI(reqBody,reqHeader)
        console.log(result);
        if(result.status === 200){
          toast.success("You have been added successfully")
          setAddDonorResponse(result.data);
          setDonorData({
            fullName: '',
            bloodType: '',
            phoneNumber: '',
            role:'donor'
          });
          navigate(`/view/${result.data.userId}`);
        }

       
        else{
          toast.error(result.response.data);

        }
      }
    }
  }
  useEffect(()=>{
    const storedToken = sessionStorage.getItem('token')
    if(storedToken){
      setToken(storedToken)
    }
  },[])
  const navigate = useNavigate()
  const logout = () => {
    sessionStorage.clear()
    navigate('/')
  }
  

  return (
    <div>
      <MDBNavbar style={{ backgroundColor: 'aliceblue' }}>
        <MDBContainer fluid >
          <MDBNavbarBrand href='#'>
            <img
              src={blood}
              height="45"
              width='70'
              alt=''
              loading='lazy'
            />
            <span className='fs-4'>BLOOD-BANK</span>
          </MDBNavbarBrand>
          <div className="text-end ">
            <ul className='d-flex w-auto  ms-4 mt-2' style={{ listStyleType: 'none', margin: '0', padding: '0' }}>
              <LuLogOut className=' ms-5 fs-4 text-dark' onClick={logout} />
            </ul>
          </div>
        </MDBContainer>
      </MDBNavbar>
      <div className="row text-center m-5">
        <div className="col-8 mt-5">
        <Card >
          <Card.Body>
            <Card.Title>Add Details</Card.Title>
            <input type="text" placeholder='Full Name' className='form-control mb-2' onChange={e => setDonorData({...donorData, fullName: e.target.value})} />
            <input type="text" placeholder='Blood Type' className='form-control mb-2' onChange={e => setDonorData({...donorData, bloodType: e.target.value})}/>
            <input type="text" placeholder='Phone Number' className='form-control mb-2' onChange={e => setDonorData({...donorData, phoneNumber: e.target.value})}/>
            <Button variant="primary" onClick={handleAddDonor}>Save</Button>
            <Toaster/>
          </Card.Body>
        </Card>
        </div>
        <div className="col-4 mt-5">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRijQqaWiBRUOQ26ItOFEYSWNpLP5Ey5Lj4jA&s" alt="" />
        </div>
      </div>
    </div>
  )
}

export default Donor