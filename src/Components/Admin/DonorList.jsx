import React, { useContext, useEffect, useState } from 'react'
import { FaEye } from "react-icons/fa6";
import { AiFillEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { IoCaretBack } from "react-icons/io5";
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';
import Header from './Header';
import AddDonor from './AddDonor';
import EditDonor from './EditDonor';
import { allDonorsAPI, deleteDonorAPI } from '../../Services/allAPIs';
import { addDonorResponseContext, editDonorResponseContext } from '../../ContextAPI/ContextShare';
import toast, { Toaster } from 'react-hot-toast';
function DonorList() {
const [allDonor,setAllDonor] = useState([])
const [searchKey,setSearchKey] = useState("")
const {addDonorResponse,setAddDonorResponse} = useContext(addDonorResponseContext)
const {editDonorResponse,setEditDonorResponse} = useContext(editDonorResponseContext)  
const getAllDonors = async()=>{
    if(sessionStorage.getItem('token')){
      const token = sessionStorage.getItem('token');
      const reqHeader = {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token
      }
      const result = await allDonorsAPI(searchKey,reqHeader)
      console.log(result.data);
      if(result.status === 200){
        const donors = result.data.filter(donor=>donor.role === 'donor')
        setAllDonor(donors)
      }
      else{
        setAllDonor([])
        toast.error(result.response.data)
      }
    }
  }

const deleteDonor = async(pid) =>{
  const token = sessionStorage.getItem("token")
  if(token){
    const reqHeader = {
      "Content-Type":"application/json",
      "Authorization":"Bearer " + token
  }
  const result = await deleteDonorAPI(pid,reqHeader)
console.log(result);
toast.success("Delete Donor Successfully")
getAllDonors()
  }
}


  useEffect(()=>{
    getAllDonors()
  },[addDonorResponse,editDonorResponse,searchKey])
  return (
    <div>
      <Header />
     <AddDonor/>
     <div className="search m-4 d-flex">
        <input type="search" className='form-control w-25' onChange={e=>setSearchKey(e.target.value)}  /><button className='btn btn-primary'>search</button>
      </div>
      <div className="table-list m-5">
        <Table striped>
          <thead>
            <tr>
              <th>ID</th>
              <th>Full Name</th>
              <th>Blood Group</th>
              <th>Phone Number</th>
              <th>Role</th>
             
              <th>
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center"}}>
                  Actions
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {
              allDonor.length>0?allDonor.map(list=>(
                <tr>
                <td>{list._id}</td>
                <td>{list.fullName}</td>
                <td>{list.bloodType}</td>
                <td>{list.phoneNumber}</td>
                <td>{list.role}</td>
                <td >
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "45px" }}>

                  <EditDonor donor={list}/>
                  <MdDelete color='#900603' size={"20px"}  onClick={()=>{deleteDonor(list._id)}}/>
                  <Toaster/>
                </div>

                </td>
              </tr>
              )):"null"
            }
           
          </tbody>
        </Table>
      </div>
      <div className="text-center m-4 pb-5">
        <Link to="/dashbord">
        <button className='btn btn-success'><IoCaretBack size={'25px'} />Back</button>
        </Link>
      </div>
    </div>
  )
}

export default DonorList