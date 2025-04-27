
import React from 'react'
import Enrollment from './components/Enrollment'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './components/Dashboard'
import EnrollmentPage from './components/enrollmentPage'



const MyApp=()=> {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/Enrollment" element={<Enrollment />}/>
        <Route path="/enrollmentPage" element={<EnrollmentPage />} />
      </Routes>
    </BrowserRouter>
  );
}
export default MyApp            
