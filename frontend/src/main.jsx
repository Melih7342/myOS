import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Homepage from './Homepage.jsx'
import Authpage from './Authenticationpage.jsx'
import Quizpage from './Quizpage.jsx'
import Resultpage from './Resultpage.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/auth" element={<Authpage />} />
        <Route path="/quizpage" element={<Quizpage />} />
        <Route path="/result" element={<Resultpage />} />
      </Routes>
    </Router>
  </StrictMode>,
)