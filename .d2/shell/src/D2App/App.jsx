
import React from 'react'
import Enrollment from './components/Enrollment'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './components/Dashboard'



const MyApp=()=> {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/Enrollment" element={<Enrollment />}/>
      </Routes>
    </BrowserRouter>
  );
}
export default MyApp            
