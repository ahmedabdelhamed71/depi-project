import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
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
import SearchSkill from './pages/Test-Page/SearchSkill';
import TestSelection from './pages/Test-Page/TestSelection';
import SkillTest from './pages/Test-Page/SkillTest';
import Result from './pages/Test-Page/Result';
import Requests from './pages/Requests/Requests';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Privacy from './pages/Privacy/Privacy';
import { AuthContext } from './pages/context/context';
import HowItWorks from './pages/How-It-Works/HowItWorks';

const App = () => {
  const location = useLocation();

  const noLayoutPages = ["/dashboard"];
  const showLayout = !noLayoutPages.includes(location.pathname);

  return (
    <div>
      {showLayout && <Header />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/aboutus" element={<Aboutus />} />
        <Route path="/discover" element={<Discover />} />
        <Route path="/login" element={<Login />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/register" element={<Register />} />
        <Route path="/requests" element={<Requests />} />
        <Route path="/testpage" element={<Testpage />} />
        <Route path="/search-skill" element={<SearchSkill />} />
        <Route path="/test-selection" element={<TestSelection />} />
        <Route path="/test" element={<SkillTest />} />
        <Route path="/result" element={<Result />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="*" element={<Notfound />} />
      </Routes>

      {showLayout && <Footer />}
    </div>
  );
};



export default App