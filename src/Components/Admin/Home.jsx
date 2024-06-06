import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import blood from '../../assets/blood.png'
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
} from 'mdb-react-ui-kit';
function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
useEffect(()=>{
  if(sessionStorage.getItem("token")){
    setIsLoggedIn(true)
  }
  else{
    setIsLoggedIn(false)
  }
},[])
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
        </MDBContainer>
      </MDBNavbar>
        <div className="row ">
            <div className="col-lg-8 text-center mt-5">
            

               <img width={'600px'} src="https://www.eraktkosh.in/BLDAHIMS/bloodbank/transactions/assets/webp/donationFact.webp" alt="" />
              
            </div>
            <div className="col-lg-4 text-center">
            <p className='m-5 ' style={{textAlign:'center',display:'flex',justifyContent:'center',alignItems:'center'}}>After donating blood, the body works to replenish the blood loss. This stimulates the production of new blood cells and in turn, helps in maintaining good health. </p>
           {
            isLoggedIn?
            <Link to={'/dashbord'}>
                <button className='btn btn-primary mb-5'>Go to dashboard</button>
              </Link>: <Link to={'/login'}>
                <button className='btn btn-primary mb-5'>Get Started</button>
              </Link>
           }
           
            </div>
        </div>
        
        <div className="row">
          <p className='fs-2 fw-bold m-3 ' style={{color:"#00308F",letterSpacing:"3px"}}>
            Blood Saftey and Matching
            </p>
            <p className='m-3 fw-bold fs-4 text-primary'>What is blood bank procedure? </p>
            <p className='m-3'>A blood bank is a place where blood is collected and stored before it is used for transfusions. Blood banking takes place in the lab. This is to make sure that donated blood and blood products are safe before they are used. Blood banking also determines the blood type.</p>
          
        </div>
    </div>
  )
}

export default Home