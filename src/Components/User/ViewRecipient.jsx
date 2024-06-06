import React, { useContext, useEffect } from 'react'
import blood from '../../assets/blood.png'
import {
    MDBContainer,
    MDBNavbar,
    MDBNavbarBrand,
} from 'mdb-react-ui-kit'
import { LuLogOut } from "react-icons/lu";
import Card from 'react-bootstrap/Card';
import { useNavigate, useParams } from 'react-router-dom';
import { viewRecipientAPI } from '../../Services/allAPIs';
import EditRecipient from '../Admin/EditRecipient';
import { editRecipientResponseContext } from '../../ContextAPI/ContextShare';
import toast from 'react-hot-toast';
function ViewRecipient() {
    const { id } = useParams()
    const {editRecipientResponse,setEditRecipientResponse} = useContext(editRecipientResponseContext)

    const [recipient, setRecipient] = useState([])
    const [token, setToken] = useState(false)
    const getRecipient = async()=>{
        if(sessionStorage.getItem('token')){
            const token = sessionStorage.getItem('token');
            const reqHeader = {
                "Authorization": "Bearer " + token
            }
            const result = await viewRecipientAPI(id,reqHeader)
            console.log(result.data);
            if(result.status === 200){
                setRecipient(result.data)
            }
            else{
                toast.error(result.response.data)
            }
        }
    }
    console.log(recipient);
    const navigate = useNavigate()
    const logout = ()=>{
        sessionStorage.clear()
        navigate('/')
    }
    useEffect(()=>{
        getRecipient()
        const storedToken = sessionStorage.getItem('token')
        if (storedToken) {
            setToken(storedToken)
        }
    },[editRecipientResponse])
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
                <div className="col-6">
                    {recipient.length > 0 ? recipient.map(item => (
                        <Card >
                            <Card.Body className='text-center'>
                                <Card.Title className='mb-4'>View Details <hr /></Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">{item.fullName}</Card.Subtitle>
                                <Card.Subtitle className="mb-2 text-muted">{item.bloodType}</Card.Subtitle>
                                <Card.Subtitle className="mb-2 text-muted">{item.phoneNumber}</Card.Subtitle>
                                <EditRecipient recipient={item}/>                            </Card.Body>
                        </Card>
                    )) : "Loading..."

                    }

                </div>
                <div className="col-3"></div>
            </div>


        </div>
  )
}

export default ViewRecipient
