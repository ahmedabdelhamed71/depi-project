import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home';
import Contact from './pages/Contact/Contact';
import Dashboard from './pages/Dashboard/Dashboard';
import Aboutus from './pages/About-Us/Aboutus';
import Discover from './pages/Discover/Discover';
import Login from './pages/Login/Login';
import Messages from './pages/Messages/Messages';
import Notfound from './pages/Not-Found/Notfound';
import Profile from './pages/Profile/Profile';
import Register from './pages/Register/Register';
import Testpage from './pages/Test-Page/Testpage';
import Requests from './pages/Requests/Requests';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Privacy from './pages/Privacy/Privacy';


const App = () => {
  return (
    <div>
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/aboutus' element={<Aboutus/>}/>
        <Route path='/discover' element={<Discover/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/messages' element={<Messages/>}/>
        <Route path='*' element={<Notfound/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/requests' element={<Requests/>}/>
        <Route path='/testpage' element={<Testpage/>}/>
        <Route path='/privacy' element={<Privacy/>}/>
      </Routes>
      <Footer/>
    </div>
  )
}
export default App