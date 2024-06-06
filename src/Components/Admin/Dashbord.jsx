import React, { useEffect, useState } from 'react'
import blood from '../../assets/blood.png'
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBBtn
} from 'mdb-react-ui-kit';

import { LuLogOut } from "react-icons/lu";

import { Link, useNavigate } from 'react-router-dom'

function Dashbord() {
  const [token, setToken] = useState(false)
  const navigate = useNavigate()
  const logout = () => {
    sessionStorage.clear()
    navigate('/')
  }
  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setToken(true)
    }
    else {
      setToken(false)
    }
  }, [])
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

      <div className="row" style={{ justifyContent: "center", alignItems: "center" }}>
        <div className="col-6">
          <p className='m-5' style={{ textAlign: 'center' }}>Risks for a person receiving blood can be divided into several categories, which include reactions due to incompatible blood types, allergic reactions, and infections in the donated blood. By strictly adhering to standardized procedures, these risks have been reduced to a minimum.</p>
          <div className="text-center p-4">
            <Link to='/recipientList'>
              <button className='btn btn-primary'>Recipients List</button>
            </Link>
          </div>
        </div>
        <div className="col-6">
          <p className='m-5' style={{ textAlign: 'center' }}>The most precious gift that one can give to another person is the gift of life i.e. blood. It is the essence of life. Did you know that people who donate blood are 88% less likely to suffer a heart attack and 33% less likely to acquire any type of cardiovascular disease.</p>
          <div className="text-center p-4">

            <Link to='/donorList'>
              <button className='btn btn-primary'>Donors List</button>
            </Link>
          </div>
        </div>
      </div>
      <div className=" pb-5  ">

        <marquee behavior="" direction="left">
          <div className="d-flex pb-5">
            <div className="col-4">
            <MDBCard style={{ width: "20rem" }}>
            <MDBCardImage height={'250px'} src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQh2GlgzV4sW4NQ_Qh7MGOYfUuLqxV4yLQHJcdD7jf3-w&s' position='top' alt='...' />
          </MDBCard>
            </div>
            <div className="col-4">
            <MDBCard style={{ width: "20rem" }}>
            <MDBCardImage height={'250px'}  src='https://www.popularhospital.in/images/blood-bank-sm-inner.jpg' position='top' alt='...' />
          </MDBCard>
            </div>
            <div className="col-4"> <MDBCard style={{ width: "20rem" }}>
            <MDBCardImage height={'250px'}  src='https://www.geetanjalihospital.co.in/images/blood-bank.jpg' position='top' alt='...' />
          </MDBCard></div>
          </div>
         
         
        </marquee>
      </div>
    </div>
  )
}

export default Dashbord