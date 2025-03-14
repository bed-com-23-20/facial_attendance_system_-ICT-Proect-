
import React from 'react'
import Dashboard from './components/Dashboard'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Enrollment from './components/Enrollment';



const MyApp=()=> {
  return (
    
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/Enrollment" element={<Enrollment />}/>
      </Routes>
  );
}
export default MyApp            
