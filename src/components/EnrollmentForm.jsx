<<<<<<< HEAD
// import React, { useState, useEffect } from 'react';
// import { TextField, MenuItem, Button, Typography, Container, Grid } from '@mui/material';
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';






// const EnrollmentForm = ({ school, onSubmit, editingEnrollment }) => {
//     const [formData, setFormData] = useState({
//         school: school || '',
//         academicYear: '',
//         yearOfStudy: '',
//         programOfStudy: '',
//         enrollmentDate: null,
//         firstName: '',
//         surname: '',
//         gender: '',
//         dateOfBirth: null,
//         nationality: '',
//         guardianName: '',
//         profilePicture: null,
//     });

//     // Pre-fill the form when editingEnrollment changes
//     useEffect(() => {
//         if (editingEnrollment) {
//             setFormData({
//                 ...editingEnrollment,
//                 enrollmentDate: editingEnrollment.enrollmentDate || null,
//                 dateOfBirth: editingEnrollment.dateOfBirth || null,
//             });
//         }
//     }, [editingEnrollment]);

//     const handleChange = (e) => {
//         setFormData({
//             ...formData,
//             [e.target.name]: e.target.value,
//         });
//     };

//     const handleDateChange = (name, date) => {
//         setFormData({
//             ...formData,
//             [name]: date,
//         });
//     };

//     const handleFileChange = (e) => {
//         const file = e.target.files[0];
//         if (file) {
//             const reader = new FileReader();
//             reader.onload = () => {
//                 setFormData({
//                     ...formData,
//                     profilePicture: reader.result,
//                 });
//             };
//             reader.readAsDataURL(file);
//         }
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//          console.log('Form submitted:');
//         onSubmit(formData); // Pass form data to the parent component
//     };

//     const handleCancel = () => {
//         setFormData({
//             school: school || '',
//             academicYear: '',
//             yearOfStudy: '',
//             programOfStudy: '',
//             enrollmentDate: null,
//             firstName: '',
//             surname: '',
//             gender: '',
//             dateOfBirth: null,
//             nationality: '',
//             guardianName: '',
//             profilePicture: null,
//         });
//         onSubmit(); // Close the form without passing any data
//     };

//     return (
//         <Container maxWidth="sm">
//             <Typography variant="h5" gutterBottom>
//                 Student Enrollment Form
//             </Typography>
//             {/* <form onSubmit={handleSubmit}> */}
//             <form >
//                 <Typography variant="h6" gutterBottom>
//                     Enrollment Details
//                 </Typography>
//                 <Grid container spacing={3}>
//                     <Grid item xs={12}>
//                         <TextField
//                             fullWidth
//                             label="School"
//                             name="school"
//                             value={formData.school}
//                             onChange={handleChange}
//                             disabled
//                             helperText="This is the school selected for enrollment"
//                         />
//                     </Grid>
//                     <Grid item xs={12}>
//                         <TextField
//                             fullWidth
//                             select
//                             label="Academic Year"
//                             name="academicYear"
//                             value={formData.academicYear}
//                             onChange={handleChange}
//                             helperText="Check that academic year matches the enrollment year"
//                         >
//                             <MenuItem value="2024-2025">2024-2025</MenuItem>
//                             <MenuItem value="2025-2026">2025-2026</MenuItem>
//                         </TextField>
//                     </Grid>
//                     <Grid item xs={12}>
//                         <TextField
//                             fullWidth
//                             select
//                             label="Year of Study"
//                             name="yearOfStudy"
//                             value={formData.yearOfStudy}
//                             onChange={handleChange}
//                         >
//                             <MenuItem value="1">1</MenuItem>
//                             <MenuItem value="2">2</MenuItem>
//                             <MenuItem value="3">3</MenuItem>
//                             <MenuItem value="4">4</MenuItem>
//                             <MenuItem value="5">5</MenuItem>
//                         </TextField>
//                     </Grid>
//                     <Grid item xs={12}>
//                         <TextField
//                             fullWidth
//                             select
//                             label="Program of Study"
//                             name="programOfStudy"
//                             value={formData.programOfStudy}
//                             onChange={handleChange}
//                         >
//                             <MenuItem value="ComputerScience">Computer Science</MenuItem>
//                             <MenuItem value="Statistics">Statistics</MenuItem>
//                             <MenuItem value="PoliticalScience">Political Science</MenuItem>
//                             <MenuItem value="Arts">Bachelor of Arts</MenuItem>
//                             <MenuItem value="InformationSystem">Information System</MenuItem>
//                         </TextField>
//                     </Grid>
//                     <Grid item xs={12}>
//                     <LocalizationProvider dateAdapter={AdapterDateFns}>
//         <DatePicker
//                 type='date'
//                 label="Enrollment Date"
//                 value={formData.enrollmentDate}
//                 onChange={(date) => handleDateChange('enrollmentDate', date)}
//                 renderInput={(params) => <TextField {...params} fullWidth />}
      
//         />
//       </LocalizationProvider>                      
                      
//                     </Grid>
//                 </Grid>
//                 <Typography variant="h6" gutterBottom style={{ marginTop: '20px' }}>
//                     Student Profile
//                 </Typography>
//                 <Grid container spacing={3}>
//                     <Grid item xs={12} style={{ textAlign: 'center' }}>
//                         {formData.profilePicture ? (
//                             <div style={{ position: 'relative', display: 'inline-block' }}>
//                                 <img
//                                     src={formData.profilePicture}
//                                     alt="Profile Preview"
//                                     style={{
//                                         width: '150px',
//                                         height: '150px',
//                                         borderRadius: '50%',
//                                         objectFit: 'cover',
//                                         border: '2px solid #ccc',
//                                     }}
//                                 />
//                                 <Button
//                                     variant="contained"
//                                     color="primary"
//                                     size="small"
//                                     style={{
//                                         position: 'absolute',
//                                         bottom: '10px',
//                                         right: '10px',
//                                         borderRadius: '50%',
//                                         minWidth: '0',
//                                         padding: '5px',
//                                     }}
//                                     onClick={() => document.getElementById('profilePictureInput').click()}
//                                 >
//                                     ✏️
//                                 </Button>
//                             </div>
//                         ) : (
//                             <Button
//                                 variant="contained"
//                                 color="primary"
//                                 onClick={() => document.getElementById('profilePictureInput').click()}
//                             >
//                                 Upload Profile Picture
//                             </Button>
//                         )}
//                         <input
//                             id="profilePictureInput"
//                             type="file"
//                             accept="image/*"
//                             style={{ display: 'none' }}
//                             onChange={handleFileChange}
//                         />
//                     </Grid>
//                     <Grid item xs={12}>
//                         <TextField
//                             fullWidth
//                             label="First Name"
//                             name="firstName"
//                             value={formData.firstName}
//                             onChange={handleChange}
//                         />
//                     </Grid>
//                     <Grid item xs={12}>
//                         <TextField
//                             fullWidth
//                             label="Surname"
//                             name="surname"
//                             value={formData.surname}
//                             onChange={handleChange}
//                         />
//                     </Grid>
//                     <Grid item xs={12}>
//                         <TextField
//                             fullWidth
//                             select
//                             label="Gender"
//                             name="gender"
//                             value={formData.gender}
//                             onChange={handleChange}
//                         >
//                             <MenuItem value="Male">Male</MenuItem>
//                             <MenuItem value="Female">Female</MenuItem>
//                             <MenuItem value="Other">Other</MenuItem>
//                         </TextField>
//                     </Grid>
//                     <Grid item xs={12}>
//                     {/* <MyDatePicker/>    */}
//                     <LocalizationProvider dateAdapter={AdapterDateFns}>
//         <DatePicker
//                 type='date'
//                 label="Date Of Birth"
//                 value={formData.enrollmentDate}
//                 onChange={(date) => handleDateChange('enrollmentDate', date)}
//                 renderInput={(params) => <TextField {...params} fullWidth />}
      
//         />
//       </LocalizationProvider>
//                     </Grid>
//                     <Grid item xs={12}>
//                         <TextField
//                             fullWidth
//                             label="Nationality"
//                             name="nationality"
//                             value={formData.nationality}
//                             onChange={handleChange}
//                         />
//                     </Grid>
//                     <Grid item xs={12}>
//                         <TextField
//                             fullWidth
//                             label="Guardian's Name"
//                             name="guardianName"
//                             value={formData.guardianName}
//                             onChange={handleChange}
//                         />
//                     </Grid>
//                 </Grid>
//                 <Grid container spacing={2} style={{ marginTop: '20px', marginBottom: '20px' }} justifyContent="space-between">
//                     <Grid item xs={12} sm={5}>
//                         <Button
//                             fullWidth
//                             type="button"
//                             variant="contained"
//                             color="primary"
//                             onClick={handleCancel}
//                         >
//                             Clear and Cancel
//                         </Button>
//                     </Grid>
//                     <Grid item xs={12} sm={5}>
//                         <Button fullWidth type="submit" variant="contained" color="primary" onClick={handleSubmit}>
//                             Save and Submit
//                         </Button>
//                     </Grid>
//                 </Grid>
//             </form>
//         </Container>
//     );
// };

// export default EnrollmentForm;

=======
>>>>>>> ade5de1 (fixing enrollment error)
// Some import from mui/x-date-pickers and mui/x-date-pickers/AdapterDateFns cause some error, so it has commented need to replace them with another implementations



import React, { useState, useEffect } from 'react';
import { TextField, MenuItem, Button, Typography, Container, Grid } from '@mui/material';
<<<<<<< HEAD
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
=======
// import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
>>>>>>> ade5de1 (fixing enrollment error)

const EnrollmentForm = ({ school, onSubmit, editingEnrollment }) => {
    const [formData, setFormData] = useState({
        school: school || '',
        academicYear: '',
        yearOfStudy: '',
        programOfStudy: '',
        enrollmentDate: null,
        firstName: '',
        surname: '',
        gender: '',
        dateOfBirth: null,
        nationality: '',
        guardianName: '',
        profilePicture: null,
    });

    // Pre-fill the form when editingEnrollment changes
    useEffect(() => {
        if (editingEnrollment) {
            setFormData({
                ...editingEnrollment,
                enrollmentDate: editingEnrollment.enrollmentDate || null,
                dateOfBirth: editingEnrollment.dateOfBirth || null,
            });
        }
    }, [editingEnrollment]);

    const handleChange = (e) => {
<<<<<<< HEAD
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
=======
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
>>>>>>> ade5de1 (fixing enrollment error)
        });
    };

    const handleDateChange = (name, date) => {
        setFormData({
            ...formData,
            [name]: date,
        });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setFormData({
                    ...formData,
                    profilePicture: reader.result,
                });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
<<<<<<< HEAD
        console.log('Form Data:', formData);
        onSubmit(formData);
=======
        onSubmit(formData); // Pass form data to the parent component
>>>>>>> ade5de1 (fixing enrollment error)
    };

    const handleCancel = () => {
        setFormData({
            school: school || '',
            academicYear: '',
            yearOfStudy: '',
            programOfStudy: '',
            enrollmentDate: null,
            firstName: '',
            surname: '',
            gender: '',
            dateOfBirth: null,
            nationality: '',
            guardianName: '',
            profilePicture: null,
        });
        onSubmit(); // Close the form without passing any data
    };

    return (
<<<<<<< HEAD
        <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
            <h2>Student Enrollment Form</h2>
=======
        <Container maxWidth="sm">
            <Typography variant="h5" gutterBottom>
                Student Enrollment Form
            </Typography>
>>>>>>> ade5de1 (fixing enrollment error)
            <form onSubmit={handleSubmit}>
                <Typography variant="h6" gutterBottom>
                    Enrollment Details
                </Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="School"
                            name="school"
                            value={formData.school}
                            onChange={handleChange}
                            disabled
                            helperText="This is the school selected for enrollment"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            select
                            label="Academic Year"
                            name="academicYear"
                            value={formData.academicYear}
                            onChange={handleChange}
                            helperText="Check that academic year matches the enrollment year"
                        >
                            <MenuItem value="2024-2025">2024-2025</MenuItem>
                            <MenuItem value="2025-2026">2025-2026</MenuItem>
                        </TextField>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            select
                            label="Year of Study"
                            name="yearOfStudy"
                            value={formData.yearOfStudy}
                            onChange={handleChange}
                        >
                            <MenuItem value="1">1</MenuItem>
                            <MenuItem value="2">2</MenuItem>
                            <MenuItem value="3">3</MenuItem>
                            <MenuItem value="4">4</MenuItem>
                            <MenuItem value="5">5</MenuItem>
                        </TextField>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            select
                            label="Program of Study"
                            name="programOfStudy"
                            value={formData.programOfStudy}
                            onChange={handleChange}
                        >
                            <MenuItem value="ComputerScience">Computer Science</MenuItem>
                            <MenuItem value="Statistics">Statistics</MenuItem>
                            <MenuItem value="PoliticalScience">Political Science</MenuItem>
                            <MenuItem value="Arts">Bachelor of Arts</MenuItem>
                            <MenuItem value="InformationSystem">Information System</MenuItem>
                        </TextField>
                    </Grid>
                    <Grid item xs={12}>
                        {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <input
                                type="date"
                                label="Enrollment Date"
                                value={formData.enrollmentDate}
                                onChange={(date) => handleDateChange('enrollmentDate', date)}
                                renderInput={(params) => <TextField {...params} fullWidth />}
                            />
                        </LocalizationProvider> */}
                    </Grid>
                </Grid>
                <Typography variant="h6" gutterBottom style={{ marginTop: '20px' }}>
                    Student Profile
                </Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12} style={{ textAlign: 'center' }}>
                        {formData.profilePicture ? (
                            <div style={{ position: 'relative', display: 'inline-block' }}>
                                <img
                                    src={formData.profilePicture}
                                    alt="Profile Preview"
                                    style={{
                                        width: '150px',
                                        height: '150px',
                                        borderRadius: '50%',
                                        objectFit: 'cover',
                                        border: '2px solid #ccc',
                                    }}
                                />
                                <Button
                                    variant="contained"
                                    color="primary"
                                    size="small"
                                    style={{
                                        position: 'absolute',
                                        bottom: '10px',
                                        right: '10px',
                                        borderRadius: '50%',
                                        minWidth: '0',
                                        padding: '5px',
                                    }}
                                    onClick={() => document.getElementById('profilePictureInput').click()}
                                >
                                    ✏️
                                </Button>
                            </div>
                        ) : (
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => document.getElementById('profilePictureInput').click()}
                            >
                                Upload Profile Picture
                            </Button>
                        )}
                        <input
                            id="profilePictureInput"
                            type="file"
                            accept="image/*"
                            style={{ display: 'none' }}
                            onChange={handleFileChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="First Name"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Surname"
                            name="surname"
                            value={formData.surname}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            select
                            label="Gender"
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                        >
                            <MenuItem value="Male">Male</MenuItem>
                            <MenuItem value="Female">Female</MenuItem>
                            <MenuItem value="Other">Other</MenuItem>
                        </TextField>
                    </Grid>
                    <Grid item xs={12}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                label="Date of Birth"
                                value={formData.dateOfBirth}
                                onChange={(date) => handleDateChange('dateOfBirth', date)}
                                renderInput={(params) => <TextField fullWidth {...params} />}
                            />
                        </LocalizationProvider>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Nationality"
                            name="nationality"
                            value={formData.nationality}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Guardian's Name"
                            name="guardianName"
                            value={formData.guardianName}
                            onChange={handleChange}
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={2} style={{ marginTop: '20px', marginBottom: '20px' }} justifyContent="space-between">
                    <Grid item xs={12} sm={5}>
                        <Button
                            fullWidth
                            type="button"
                            variant="contained"
                            color="primary"
                            onClick={handleCancel}
                        >
                            Clear and Cancel
                        </Button>
                    </Grid>
                    <Grid item xs={12} sm={5}>
                        <Button fullWidth type="submit" variant="contained" color="primary">
                            Save and Submit
                        </Button>
                    </Grid>
                </Grid>
            </form>
<<<<<<< HEAD
        </div>
=======
        </Container>
>>>>>>> ade5de1 (fixing enrollment error)
    );
};

export default EnrollmentForm;