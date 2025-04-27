import React, { useEffect, useState } from 'react';
import {fetchOrganisationUnits} from './integration'
import Enrollment from './components/Enrollment'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './components/Dashboard'
import EnrollmentPage from './components/enrollmentPage'



const MyApp=()=> {
const [selectedSchool, setSelectedSchool] = useState('');
  const [orgUnits, setOrgUnits] = useState([]); // State for organization unit
    // const [orgUnitsId, setOrgUnitsId] = useState(''); // State for selected school id


        // const [selectedSchoolId, setSelectedSchoolId] = useState('');
    
        // const handleSchoolChange = (e) => {
        //   const selectedId = e.target.value;
        //   setSelectedSchoolId(selectedId);
        //   const selectedSchools = orgUnits.find(item => item.id === selectedId);
        //   if (selectedSchools) {
        //     // console.log(`Name: ${selectedSchools.name}, ID: ${selectedSchools.id}`);
        //     setSelectedSchool(selectedSchools.name);
        //     setOrgUnitsId(selectedSchools.id);
        //   }
        // };
    
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
// orgUnitsId={orgUnitsId} selected={selectedSchoolId} handleSchoolChange={handleSchoolChange}