import React, { useContext, useEffect, useState } from 'react'
import { IoCaretBack } from "react-icons/io5";
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';
import Header from './Header';
import { MdDelete } from "react-icons/md";

import AddRecipient from './AddRecipient';
import EditRecipient from './EditRecipient';
import { allRecipientAPI, deleteRecipientAPI } from '../../Services/allAPIs';
import { addRecipientResponseContext, editRecipientResponseContext } from '../../ContextAPI/ContextShare';
import toast, { Toaster } from 'react-hot-toast';
function RecipientList() {
  const {editRecipientResponse,setEditRecipientResponse} = useContext(editRecipientResponseContext)
  const { addRecipientResponse, setAddRecipientResponse } = useContext(addRecipientResponseContext)
  const [allRecipient, setAllRecipient] = useState([])
  const [searchKey,setSearchKey] = useState("")
  const getAllRecipients = async () => {
    if (sessionStorage.getItem('token')) {
      const token = sessionStorage.getItem('token');
      const reqHeader = {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token
      }
      const result = await allRecipientAPI(searchKey,reqHeader)
      console.log(result);
      if (result.status === 200) {
        const recipients = result.data.filter(recipient=>recipient.role === 'recipient')
        setAllRecipient(recipients)
      }
      else {
        setAllRecipient([])
        toast.error(result.response.data)
      }
    }
  }


  const deleteRecipient = async(pid) => {
    const token = sessionStorage.getItem("token")
    if(token){
      const reqHeader = {
          "Content-Type":"application/json",
          "Authorization":"Bearer " + token
      }
      const result = await deleteRecipientAPI(pid,reqHeader)
      console.log(result);
      toast.success("Delete Recipient Successfully")
      getAllRecipients()
    }
  }



  useEffect(() => {
    getAllRecipients()
  }, [addRecipientResponse,editRecipientResponse,searchKey])
  
  return (

    <div>
      <Header />
      
      <AddRecipient />
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
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                  Actions
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {
              allRecipient.length > 0 ? allRecipient.map(item => (
                <tr>
                  <td>{item._id}</td>
                  <td>{item.fullName}</td>
                  <td>{item.bloodType}</td>
                  <td>{item.phoneNumber}</td>
                  <td>{item.role}</td>
                 
                  <td >
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "45px" }}>
                    <EditRecipient recipient={item} />
                      <MdDelete color='#900603' size={"20px"} onClick={()=>deleteRecipient(item._id)}/>
                  <Toaster/>
                    </div>
                  </td>
                </tr>
              )) : "null"
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

export default RecipientList