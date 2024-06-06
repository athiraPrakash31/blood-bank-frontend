
import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Footer from './Components/Admin/Footer'
import Header from './Components/Admin/Header'
import Auth from './Components/User/Auth'
import Home from './Components/Admin/Home'
import DonorList from './Components/Admin/DonorList'
import RecipientList from './Components/Admin/RecipientList'
import Dashbord from './Components/Admin/Dashbord'
import Donor from './Components/User/Donor'
import Recipient from './Components/User/Recipient'
import ViewDonor from './Components/User/ViewDonor'

function App() {


  return (
    <>
      {/* <Header/> */}
      <Routes>
      <Route path={'/'} element={<Home/>}/>
      <Route path={'/login'} element={<Auth/>}/>
      <Route path={'/register'} element={<Auth register/>}/>
      <Route path={'/donorList'} element={<DonorList/>}/>
      <Route path={'/recipientList'} element={<RecipientList/>}/>
      <Route path={'/dashbord'} element={<Dashbord/>}/>
      <Route path={'/user/donor'} element={<Donor/>}/>
      <Route path={'/user/recipient'} element={<Recipient/>}/>
      <Route path={'/view/:id'} element={<ViewDonor/>}/>
      {/* <Route path={'*'} element={<Navigate to={'/'}/>}/> */}

      </Routes>
      <Footer/>
    </>
  )
}

export default App
