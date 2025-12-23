import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Homepage from './Homepage.jsx'
import Loginpage from './Loginpage.jsx'
import Registerpage from './Registerpage.jsx'
import Quizpage from './Quizpage.jsx'



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Loginpage />} />
        <Route path="/register" element={<Registerpage />} />
        <Route path="/quizpage" element={<Quizpage />} />
      </Routes>
    </Router>
  </StrictMode>,
)
