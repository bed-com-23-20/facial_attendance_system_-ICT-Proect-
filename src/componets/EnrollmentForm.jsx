import React, { useState } from 'react';
import { TextField, MenuItem, Button, Typography, Container, Grid } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

const EnrollmentForm = () => {
    const [formData, setFormData] = useState({
        school: '',
        academicYear: '',
        yearOfStudy: '',
        programOfStudy: '',
        enrollmentDate: null,
        firstName: '',
        surname: '',
        gender: '',
        dateOfBirth: null,
        nationality: '',
        guardianName: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleDateChange = (name, date) => {
        setFormData({
            ...formData,
            [name]: date
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
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
                            label="Registering School"
                            name="school"
                            value={formData.school}
                            onChange={handleChange}
                            disabled
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
                            <MenuItem value="Science">Science</MenuItem>
                            <MenuItem value="Arts">Arts</MenuItem>
                            <MenuItem value="Commerce">Commerce</MenuItem>
                        </TextField>
                    </Grid>
                    <Grid item xs={12}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                label="Enrollment date"
                                value={formData.enrollmentDate}
                                onChange={(date) => handleDateChange('enrollmentDate', date)}
                                renderInput={(params) => <TextField fullWidth {...params} />}
                            />
                        </LocalizationProvider>
                    </Grid>
                </Grid>
                <Typography variant="h6" gutterBottom style={{ marginTop: '20px' }}>
                    Student profile
                </Typography>
                <Grid container spacing={3}>
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
                    <Grid item xs={5}>
                        <Button fullWidth type="button" variant="contained" color="primary">
                            Clear and Cancel
                        </Button>
                    </Grid>
                    <Grid item xs={5}>
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