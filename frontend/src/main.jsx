import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Homepage from './Homepage.jsx'
import Loginpage from './Loginpage.jsx'
import Registerpage from './Registerpage.jsx'
import Navbar from './Navbar.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Navbar />} />
        <Route path="/login" element={<Loginpage />} />
        <Route path="/register" element={<Registerpage />} />
      </Routes>
    </Router>
  </StrictMode>,
)
