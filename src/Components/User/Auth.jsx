import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import bloodbank from '../../assets/bloodbank.jpg';
import toast, { Toaster } from 'react-hot-toast';
import { loginAPI, registerAPI } from '../../Services/allAPIs';
import blood from '../../assets/blood.png';
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
} from 'mdb-react-ui-kit';

function Auth({ register }) {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
    role:""
  });

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!userData.username || !userData.email || !userData.password ||!userData.role) {
      toast.error("Please fill all fields");
    } else {
      try {
        const result = await registerAPI(userData);
        console.log(result);
        if (result.status === 200) {
          toast.success("Register Successfully Completed", {
            duration: 4000
          });
          setUserData({
            username: "",
            email: "",
            password: "",
            role:""
          });
          navigate('/login');
        } else if (result.status === 406) {
          toast.error(result.data, {
            duration: 4000
          });
        }
      } catch (error) {
        toast.error("An error occurred during registration. Please try again.", {
          duration: 4000
        });
      }
    }
    console.log(userData);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!userData.email || !userData.password) {
      toast.error("Please fill the form");
    } else {
      try {
        const result = await loginAPI(userData);
        console.log(result);
        if (result.status === 200) {

          sessionStorage.setItem("username", result.data.user.username);
          sessionStorage.setItem("token", result.data.token);

          toast.success("Successfully Login");
          setUserData({
            email: "",
            password: ""
          });
          // check the role and navigate accordingly
          if(result.data.user.role === "donor"){
            setTimeout(()=>{
              toast.success('Login as Donor')
            },2000)
            navigate('/user/donor')
          }
         
          else if(result.data.user.role === "recipient"){
            setTimeout(()=>{
              toast.success('Login as Recipient')
            },2000)
            navigate('/user/recipient')
          }
          else{
            setTimeout(()=>{
              toast.success('Login as Admin')
            },2000)
            navigate('/dashbord');
          }
        } else if (result.status === 404) {
          toast.error(result.data, {
            duration: 4000
          });
        }
      } catch (error) {
        toast.error("An error occurred during login. Please try again.", {
          duration: 4000
        });
      }
    }
  };

  return (
    <div>
      <MDBNavbar style={{ backgroundColor: 'aliceblue' }}>
        <MDBContainer fluid>
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
      <div className="row">
        <div className="col-lg-2"></div>
        <div className="col-lg-8">
          <form className='shadow  m-4' style={{ backgroundImage: `url(${bloodbank})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
            <h2 className="text-center text-light mt-4 p-3" style={{ textShadow: '3px 2px black', letterSpacing: '5px' }}>
              BLOOD BANK
            </h2>
            <div className="text-center text-light">
              {register ? 'Register Here...' : 'Login Here...'}
            </div>
            <div className='mx-5 px-5 mt-3'>
              {register && (
                <>
                  <input type="text" onChange={e => setUserData({ ...userData, username: e.target.value })} value={userData.username} placeholder='Username' className='form-control mb-3' />
                  <select className='form-control mb-3' onChange={e=> setUserData({ ...userData, role:e.target.value})} value={userData.role}>
                    <option value="">Select Role</option>
                    <option value="donor">Donor</option>
                    <option value="recipient">Recipient</option>
                  </select>
                </>
              )}
              <input type="email" onChange={e => setUserData({ ...userData, email: e.target.value })} value={userData.email} placeholder='Email' className='form-control mb-3' />
              <input type="password" onChange={e => setUserData({ ...userData, password: e.target.value })} value={userData.password} placeholder='Password' className='form-control mb-3' />
            </div>
            {register ?
              <div className="text-center m-4">
                <button onClick={handleRegister} className='btn btn-info m-4'>Register</button>
                <Toaster />
                <p className='pb-2 text-light'>Already Registered? <Link to='/login' className='text-light fw-bold'>Login here...</Link></p>
              </div> :
              <div className="text-center m-4">
                <button onClick={handleLogin} className='btn btn-info m-4'>Login</button>
                <Toaster />
                <p className='pb-2 text-light'>New to here? <Link to='/register' className='text-light fw-bold'>Register here...</Link></p>
              </div>
            }
          </form>
        </div>
      </div>
    </div>
  );
}

export default Auth;
