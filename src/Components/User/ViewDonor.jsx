import React, { useContext, useEffect, useState } from 'react'
import blood from '../../assets/blood.png'
import {
    MDBContainer,
    MDBNavbar,
    MDBNavbarBrand,
} from 'mdb-react-ui-kit'
import { LuLogOut } from "react-icons/lu";
import Card from 'react-bootstrap/Card';
import { useNavigate, useParams } from 'react-router-dom';
import { viewDonorAPI } from '../../Services/allAPIs';
import toast from 'react-hot-toast';
import EditDonor from '../Admin/EditDonor';
import { editDonorResponseContext } from '../../ContextAPI/ContextShare';

function ViewDonor() {
    const { id } = useParams()
    
    console.log(id);
    const {editDonorResponse,setEditDonorResponse} = useContext(editDonorResponseContext)  

    const [donor, setDonor] = useState([])
    const [token, setToken] = useState(false)
    const getDonor = async () => {
        if (sessionStorage.getItem('token')) {
            const token = sessionStorage.getItem('token');
            const reqHeader = {
                "Authorization": "Bearer " + token
            }
            const result = await viewDonorAPI(id, reqHeader)
            console.log(result.data);
            if (result.status === 200) {
                setDonor(result.data)
            }
            else {
                toast.error(result.response.data)
            }
        }
    }
    console.log(donor);
    const navigate = useNavigate()
    const logout = () => {
        sessionStorage.clear()
        navigate('/')
    }
    useEffect(() => {
        getDonor()

        const storedToken = sessionStorage.getItem('token')
        if (storedToken) {
            setToken(storedToken)
        }
    }, [editDonorResponse])
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

            <div className="text-center">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRijQqaWiBRUOQ26ItOFEYSWNpLP5Ey5Lj4jA&s" alt="" />
            </div>
            <div className="row">
                <div className="col-3"></div>
                <div className="col-6 ">
                    {donor.length > 0 ? donor.map(list => (
                        <Card className=' m-3' >
                            <Card.Body className='text-center'>
                                <Card.Title className='mb-4'>View Details <hr /></Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">{list.fullName}</Card.Subtitle>
                                <Card.Subtitle className="mb-2 text-muted">{list.bloodType}</Card.Subtitle>
                                <Card.Subtitle className="mb-2 text-muted">{list.phoneNumber}</Card.Subtitle>
                                <EditDonor donor={list}/>                            </Card.Body>
                        </Card>
                    )) : "Loading..."

                    }

                </div>
                <div className="col-3"></div>
            </div>


        </div>
    )
}

export default ViewDonor