
import React from 'react'
import Dashboard from './components/Dashboard'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Enrollment from './components/Enrollment';
import OrgUnitList from './components/sample';
// import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';



const MyApp=()=> {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/Enrollment" element={<Enrollment />}/>
        <Route path="/data" element={<OrgUnitList/>}/>
      </Routes>
    </BrowserRouter>
  );
}
export default MyApp            
