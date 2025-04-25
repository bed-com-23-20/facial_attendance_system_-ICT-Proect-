
import React from 'react'
import classes from './App.module.css'
import Enrollment from './componets/Enrollment'
import EnrollmentForm from './componets/EnrollmentForm'
//import '@fortawesome/fontawesome-free/css/all.min.css'



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
