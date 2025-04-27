import React, { useEffect, useState } from 'react';
import {fetchOrganisationUnits} from './integration'
import Enrollment from './components/Enrollment'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './components/Dashboard'
import EnrollmentPage from './components/enrollmentPage'



const MyApp=()=> {
const [selectedSchool, setSelectedSchool] = useState('');
  const [orgUnits, setOrgUnits] = useState([]); // State for organization unit

    
      //getting all org units
      const find = async()=>{
        const data = await fetchOrganisationUnits()
      setOrgUnits( data)
      // console.log(orgUnits)
     }
 useEffect(() => { 
 
    find()
   },[selectedSchool])
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/Enrollment" element={<Enrollment orgUnit={orgUnits} />}/>
        <Route path="/enrollmentPage" element={<EnrollmentPage />} />
      </Routes>
    </BrowserRouter>
  );
}
export default MyApp            
