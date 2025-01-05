
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Postjob from './pages/Postjob'
import Jobs from './pages/Jobs'
import Login from './pages/Login'
import Register from './pages/Register'
import Pagenotfound from './pages/Pagenotfound'


import Profile from './pages/Profile'
import Viewjob from './pages/Viewjob'
import Page1 from './pages/Page1'
import Admin from './pages/Admin'

function App() {


  return (
    <>
    
      <Routes>
        
        <Route path='/home' element={<Page1/>}/>
        <Route path='/' element={<Home/>}/>
        <Route path='/jobs' element={<Jobs/>}/>
        <Route path='/postjob' element={<Postjob/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/view/:id' element={<Viewjob/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/admin' element={<Admin/>}/>
        <Route path='/*' element={<Pagenotfound/>}/>
      
      </Routes>

      
    </>
  )
}

export default App
