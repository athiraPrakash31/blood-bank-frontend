import React, { useEffect, useState } from 'react'
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
} from 'mdb-react-ui-kit';
import { LuLogOut } from "react-icons/lu";
import blood from '../../assets/blood.png'
import { Link, useNavigate } from 'react-router-dom';
function Header() {
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
  },[])
  return (
    <div>
      <MDBNavbar  style={{ backgroundColor: 'aliceblue' }}>
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
              <Link to={"/"} style={{ textDecoration: 'none' }}>
                <li className='ms-5'>HOME</li>
              </Link>
              <Link to={"/DonorList"} style={{ textDecoration: 'none' }}>
                <li className='ms-5'>DONOR LIST</li>
              </Link>
              <Link to={"/RecipientList"} style={{ textDecoration: 'none' }}>
                <li className='ms-5'>RECIPIENT LIST</li>
              </Link>
              
              <LuLogOut className=' ms-5 fs-4 text-dark' onClick={logout} />

            </ul>

          </div>
        </MDBContainer>
      </MDBNavbar>
    </div>
  )
}

export default Header