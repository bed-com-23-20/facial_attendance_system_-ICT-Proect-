import React, { useState } from 'react';
import { TextField, MenuItem, Button, Typography, Container, Grid } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

const EnrollmentForm = ({ school, onSubmit }) => {
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

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
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
        onSubmit(formData); // Pass form data to the parent component
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
        <Container maxWidth="sm">
            <Typography variant="h5" gutterBottom>
                Student Enrollment Form
            </Typography>
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
                            required
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
                            required
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
                            required 
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
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                required
                                label="Enrollment Date"
                                value={formData.enrollmentDate}
                                onChange={(date) => handleDateChange('enrollmentDate', date)}
                                renderInput={(params) => <TextField {...params} fullWidth />}
                            />
                        </LocalizationProvider>
                    </Grid>
                </Grid>
                <Typography variant="h6" gutterBottom style={{ marginTop: '20px' }}>
                    Student Profile
                </Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12} style={{ textAlign: "center" }}>
                        {formData.profilePicture ? (
                            <div style={{ position: "relative", display: "inline-block" }}>
                                <img
                                    src={formData.profilePicture}
                                    alt="Profile Preview"
                                    style={{
                                        width: "150px",
                                        height: "150px",
                                        borderRadius: "50%",
                                        objectFit: "cover",
                                        border: "2px solid #ccc",
                                    }}
                                />
                                <Button
                                    variant="contained"
                                    color="primary"
                                    size="small"
                                    style={{
                                        position: "absolute",
                                        bottom: "10px",
                                        right: "10px",
                                        borderRadius: "50%",
                                        minWidth: "0",
                                        padding: "5px",
                                    }}
                                    onClick={() => document.getElementById("profilePictureInput").click()}
                                >
                                    ✏️
                                </Button>
                            </div>
                        ) : (
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => document.getElementById("profilePictureInput").click()}
                            >
                                Upload Profile Picture
                            </Button>
                        )}
                        <input
                            id="profilePictureInput"
                            type="file"
                            accept="image/*"
                            style={{ display: "none" }}
                            onChange={handleFileChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            required
                            label="First Name"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            required
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
                            required
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
                                required
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
                            required
                            label="Nationality"
                            name="nationality"
                            value={formData.nationality}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            required
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
                            //onClick={handleCancel}
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
        </Container>
    );
};

export default EnrollmentForm;