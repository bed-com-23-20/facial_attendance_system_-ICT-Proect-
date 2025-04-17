// import React, { useState, useEffect } from 'react';
// import {
//   TextField, MenuItem, Button, Typography, Container, Grid
// } from '@mui/material';
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import {
//   registerStudent, fetchTrackedEntityTypeId, fetchTrackedEntityAttributes
// } from '../integration';

// const EnrollmentForm = ({ school, onSubmit, editingEnrollment }) => {
//   const [formData, setFormData] = useState({
//     school: school || '',
//     academicYear: '',
//     yearOfStudy: '',
//     programOfStudy: '',
//     enrollmentDate: null,
//     firstName: '',
//     surname: '',
//     gender: '',
//     dateOfBirth: null,
//     nationality: '',
//     guardianName: '',
//     profilePicture: null,
//   });

//   const [trackedEntityTypeId, setTrackedEntityTypeId] = useState(null);
//   const [attributeMap, setAttributeMap] = useState({});

//   useEffect(() => {
//     const loadData = async () => {
//       try {
//         const typeId = await fetchTrackedEntityTypeId("students");
//         setTrackedEntityTypeId(typeId);

//         const attributes = await fetchTrackedEntityAttributes(typeId);
//         const mapped = {};
//         attributes.forEach(attr => {
//           const name = attr.displayName.toLowerCase();
//           if (name.includes('first name')) mapped.firstName = attr.id;
//           else if (name.includes('surname')) mapped.surname = attr.id;
//           else if (name.includes('gender')) mapped.gender = attr.id;
//           else if (name.includes('date of birth')) mapped.dateOfBirth = attr.id;
//           else if (name.includes('nationality')) mapped.nationality = attr.id;
//           else if (name.includes('guardian')) mapped.guardianName = attr.id;
//           else if (name.includes('photo')) mapped.profilePicture = attr.id;
//         });
//         setAttributeMap(mapped);
//       } catch (error) {
//         console.error('Error fetching DHIS2 metadata:', error);
//       }
//     };
//     loadData();
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // if (!trackedEntityTypeId || Object.keys(attributeMap).length === 0) {
//     //   alert("Metadata not loaded yet. Please try again.");
//     //   return;
//     // }

//     const attributes = [
//       { attribute: attributeMap.firstName, value: formData.firstName },
//       { attribute: attributeMap.surname, value: formData.surname },
//       { attribute: attributeMap.gender, value: formData.gender },
//       { attribute: attributeMap.dateOfBirth, value: formData.dateOfBirth?.toISOString().split('T')[0] },
//       { attribute: attributeMap.nationality, value: formData.nationality },
//       { attribute: attributeMap.guardianName, value: formData.guardianName }
//     ];

//     // Only include profile picture if available
//     if (formData.profilePicture && attributeMap.profilePicture) {
//       attributes.push({ attribute: attributeMap.profilePicture, value: formData.profilePicture });
//     }

//     const studentPayload = {
//       trackedEntityType: trackedEntityTypeId,
//       orgUnit: formData.school,
//       attributes,
//       enrollments: [
//         {
//           orgUnit: formData.school,
//           program: "qxZBosiOpz0",
//           enrollmentDate: formData.enrollmentDate?.toISOString().split('T')[0],
//           incidentDate: formData.enrollmentDate?.toISOString().split('T')[0],
//         },
//       ],
//     };

//     try {
//       const response = await registerStudent(studentPayload);
//       console.log('Student registered:', response);
//       alert('Student registered successfully!');
//       onSubmit(formData);
//     } catch (error) {
//       console.error('Registration failed:', error);
//       alert('Failed to register student.');
//     }
//   };

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleDateChange = (name, date) => {
//     setFormData({ ...formData, [name]: date });
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = () => {
//         setFormData({ ...formData, profilePicture: reader.result });
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleCancel = () => {
//     setFormData({
//       school: school || '',
//       academicYear: '',
//       yearOfStudy: '',
//       programOfStudy: '',
//       enrollmentDate: null,
//       firstName: '',
//       surname: '',
//       gender: '',
//       dateOfBirth: null,
//       nationality: '',
//       guardianName: '',
//       profilePicture: null,
//     });
//     onSubmit();
//   };

//   return (
//     <Container maxWidth="sm">
//       <Typography variant="h5" gutterBottom>Student Enrollment Form</Typography>
//       <form onSubmit={handleSubmit}>
//         <Typography variant="h6" gutterBottom>Enrollment Details</Typography>
//         <Grid container spacing={3}>
//           <Grid item xs={12}>
//             <TextField fullWidth label="School" name="school" value={formData.school} disabled />
//           </Grid>
//           <Grid item xs={12}>
//             <TextField fullWidth select label="Academic Year" name="academicYear" value={formData.academicYear} onChange={handleChange}>
//               <MenuItem value="2024-2025">2024-2025</MenuItem>
//               <MenuItem value="2025-2026">2025-2026</MenuItem>
//             </TextField>
//           </Grid>
//           <Grid item xs={12}>
//             <TextField fullWidth select label="Year of Study" name="yearOfStudy" value={formData.yearOfStudy} onChange={handleChange}>
//               {[1, 2, 3, 4, 5].map(year => <MenuItem key={year} value={year}>{year}</MenuItem>)}
//             </TextField>
//           </Grid>
//           <Grid item xs={12}>
//             <TextField fullWidth select label="Program of Study" name="programOfStudy" value={formData.programOfStudy} onChange={handleChange}>
//               <MenuItem value="ComputerScience">Computer Science</MenuItem>
//               <MenuItem value="Statistics">Statistics</MenuItem>
//               <MenuItem value="PoliticalScience">Political Science</MenuItem>
//               <MenuItem value="Arts">Bachelor of Arts</MenuItem>
//               <MenuItem value="InformationSystem">Information System</MenuItem>
//             </TextField>
//           </Grid>
//           <Grid item xs={12}>
//             <LocalizationProvider dateAdapter={AdapterDateFns}>
//               <DatePicker
//                 label="Enrollment Date"
//                 value={formData.enrollmentDate}
//                 onChange={(date) => handleDateChange('enrollmentDate', date)}
//                 renderInput={(params) => <TextField {...params} fullWidth />}
//               />
//             </LocalizationProvider>
//           </Grid>
//         </Grid>

//         <Typography variant="h6" gutterBottom style={{ marginTop: 20 }}>Student Profile</Typography>
//         <Grid container spacing={3}>
//           <Grid item xs={12} style={{ textAlign: 'center' }}>
//             {formData.profilePicture ? (
//               <div style={{ position: 'relative', display: 'inline-block' }}>
//                 <img
//                   src={formData.profilePicture}
//                   alt="Profile Preview"
//                   style={{ width: 150, height: 150, borderRadius: '50%', objectFit: 'cover', border: '2px solid #ccc' }}
//                 />
//                 <Button
//                   variant="contained"
//                   color="primary"
//                   size="small"
//                   style={{ position: 'absolute', bottom: 10, right: 10, borderRadius: '50%', minWidth: 0, padding: 5 }}
//                   onClick={() => document.getElementById('profilePictureInput').click()}
//                 >✏️</Button>
//               </div>
//             ) : (
//               <Button variant="contained" color="primary" onClick={() => document.getElementById('profilePictureInput').click()}>
//                 Upload Profile Picture
//               </Button>
//             )}
//             <input
//               id="profilePictureInput"
//               type="file"
//               accept="image/*"
//               style={{ display: 'none' }}
//               onChange={handleFileChange}
//             />
//           </Grid>
//           <Grid item xs={12}>
//             <TextField fullWidth label="First Name" name="firstName" value={formData.firstName} onChange={handleChange} />
//           </Grid>
//           <Grid item xs={12}>
//             <TextField fullWidth label="Surname" name="surname" value={formData.surname} onChange={handleChange} />
//           </Grid>
//           <Grid item xs={12}>
//             <TextField fullWidth select label="Gender" name="gender" value={formData.gender} onChange={handleChange}>
//               <MenuItem value="Male">Male</MenuItem>
//               <MenuItem value="Female">Female</MenuItem>
//               <MenuItem value="Other">Other</MenuItem>
//             </TextField>
//           </Grid>
//           <Grid item xs={12}>
//             <LocalizationProvider dateAdapter={AdapterDateFns}>
//               <DatePicker
//                 label="Date of Birth"
//                 value={formData.dateOfBirth}
//                 onChange={(date) => handleDateChange('dateOfBirth', date)}
//                 renderInput={(params) => <TextField {...params} fullWidth />}
//               />
//             </LocalizationProvider>
//           </Grid>
//           <Grid item xs={12}>
//             <TextField fullWidth label="Nationality" name="nationality" value={formData.nationality} onChange={handleChange} />
//           </Grid>
//           <Grid item xs={12}>
//             <TextField fullWidth label="Guardian's Name" name="guardianName" value={formData.guardianName} onChange={handleChange} />
//           </Grid>
//         </Grid>

//         <Grid container spacing={2} style={{ marginTop: 20, marginBottom: 20 }} justifyContent="space-between">
//           <Grid item xs={12} sm={5}>
//             <Button fullWidth type="button" variant="outlined" color="secondary" onClick={handleCancel}>
//               Clear and Cancel
//             </Button>
//           </Grid>
//           <Grid item xs={12} sm={5}>
//             <Button fullWidth type="submit" variant="contained" color="primary">
//               Save and Submit
//             </Button>
//           </Grid>
//         </Grid>
//       </form>
//     </Container>
//   );
// };

// export default EnrollmentForm;
