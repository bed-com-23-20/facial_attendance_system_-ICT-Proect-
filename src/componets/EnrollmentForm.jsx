import React, { useState } from 'react';
import { TextField, MenuItem, Button, Typography, Container, Grid } from '@mui/material';
import { DatePicker } from '@mui/lab';

const EnrollmentForm = () => {
    const [formData, setFormData] = useState({
        school: 'Bethel BCS',
        academicYear: '',
        grade: '',
        classSection: '',
        enrollmentDate: null,
        systemId: '2025-ts791464'
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleDateChange = (date) => {
        setFormData({
            ...formData,
            enrollmentDate: date
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
    };

    return (
        <Container maxWidth="sm">
            <Typography variant="h5" gutterBottom>
                Single Student Enrollment
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
                            label="Grade"
                            name="grade"
                            value={formData.grade}
                            onChange={handleChange}
                        >
                            <MenuItem value="1">1</MenuItem>
                            <MenuItem value="2">2</MenuItem>
                            <MenuItem value="3">3</MenuItem>
                        </TextField>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            select
                            label="Class/Section"
                            name="classSection"
                            value={formData.classSection}
                            onChange={handleChange}
                        >
                            <MenuItem value="A">A</MenuItem>
                            <MenuItem value="B">B</MenuItem>
                            <MenuItem value="C">C</MenuItem>
                        </TextField>
                    </Grid>
                    <Grid item xs={12}>
                        <DatePicker
                            label="Enrollment date"
                            value={formData.enrollmentDate}
                            onChange={handleDateChange}
                            renderInput={(params) => <TextField fullWidth {...params} />}
                        />
                    </Grid>
                </Grid>
                <Typography variant="h6" gutterBottom style={{ marginTop: '20px' }}>
                    Student profile
                </Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="System ID"
                            name="systemId"
                            value={formData.systemId}
                            onChange={handleChange}
                            disabled
                        />
                    </Grid>
                </Grid>
                <Button type="submit" variant="contained" color="primary" style={{ marginTop: '20px' }}>
                    Submit
                </Button>
            </form>
        </Container>
    );
};

export default EnrollmentForm;