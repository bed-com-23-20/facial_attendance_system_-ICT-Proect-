import React, { useState, useEffect } from 'react';
import {
    Container, Typography, Button, TextField, MenuItem,
    Grid, Paper, CircularProgress
} from '@mui/material';
import Webcam from 'react-webcam';
import axios from 'axios';

const Attendance = ({ courses, students, onAttendanceComplete }) => {
    const [selectedCourse, setSelectedCourse] = useState('');
    const [attendanceList, setAttendanceList] = useState([]);
    const [isTakingAttendance, setIsTakingAttendance] = useState(false);
    const [attendanceTime, setAttendanceTime] = useState(30); // in minutes
    const [timer, setTimer] = useState(0);
    const [loading, setLoading] = useState(false);
    const webcamRef = React.useRef(null);

    useEffect(() => {
        if (selectedCourse) {
            const courseStudents = students.filter(s => s.courseId === selectedCourse);
            const list = courseStudents.map(s => ({
                ...s,
                status: 'pending',
            }));
            setAttendanceList(list);
        }
    }, [selectedCourse, students]);

    useEffect(() => {
        let interval;
        if (isTakingAttendance) {
            setTimer(attendanceTime * 60); // convert minutes to seconds
            interval = setInterval(() => {
                setTimer(prev => {
                    if (prev <= 1) {
                        clearInterval(interval);
                        finalizeAttendance();
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isTakingAttendance]);

    const capture = async () => {
        if (!webcamRef.current) return;
    
        const imageSrc = webcamRef.current.getScreenshot();
        if (!imageSrc) return;
    
        setLoading(true);
        try {
            // Step 1: Verify face and get matched students
            const verifyRes = await axios.post('/attendance/verify', {
                image: imageSrc,
                courseId: selectedCourse
            });
    
            const matchedRegNumbers = verifyRes.data.matchedRegistrationNumbers;
    
            // Step 2: Mark attendance for matched students
            const updatedList = await Promise.all(attendanceList.map(async (student) => {
                if (matchedRegNumbers.includes(student.registrationNumber)) {
                    try {
                        await axios.post('/attendance/mark', {
                            registrationNumber: student.registrationNumber
                        });
                        return { ...student, status: 'present' };
                    } catch (err) {
                        console.error(`Failed to mark ${student.registrationNumber}`, err);
                    }
                }
                return student;
            }));
    
            setAttendanceList(updatedList);
        } catch (err) {
            console.error("Error during verification", err);
        }
        setLoading(false);
    };
    
    const finalizeAttendance = () => {
        const updatedList = attendanceList.map(student => {
            if (student.status === 'pending') {
                return { ...student, status: 'late' };
            }
            return student;
        });
        setAttendanceList(updatedList);
        setIsTakingAttendance(false);
        onAttendanceComplete(updatedList);
    };

    return (
        <Container>
            <Typography variant="h5" gutterBottom>Take Attendance</Typography>

            <Grid container spacing={2} sx={{ mb: 2 }}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        select
                        label="Select Course"
                        fullWidth
                        value={selectedCourse}
                        onChange={(e) => setSelectedCourse(e.target.value)}
                    >
                        {courses.map(course => (
                            <MenuItem key={course.id} value={course.id}>
                                {course.name}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Attendance Window (mins)"
                        type="number"
                        fullWidth
                        value={attendanceTime}
                        onChange={(e) => setAttendanceTime(Number(e.target.value))}
                    />
                </Grid>
            </Grid>

            {selectedCourse && (
                <>
                    <Webcam
                        audio={false}
                        ref={webcamRef}
                        screenshotFormat="image/jpeg"
                        width="100%"
                        style={{ borderRadius: 8 }}
                    />

                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => setIsTakingAttendance(true)}
                        sx={{ mt: 2 }}
                        disabled={isTakingAttendance}
                    >
                        Start Attendance
                    </Button>

                    {isTakingAttendance && (
                        <>
                            <Typography variant="body1" sx={{ mt: 1 }}>
                                Time Remaining: {Math.floor(timer / 60)}:{String(timer % 60).padStart(2, '0')}
                            </Typography>
                            <Button
                                variant="outlined"
                                onClick={capture}
                                sx={{ mt: 2 }}
                                disabled={loading}
                            >
                                {loading ? <CircularProgress size={20} /> : 'Capture & Verify'}
                            </Button>
                        </>
                    )}

                    <Paper sx={{ mt: 4, p: 2 }}>
                        <Typography variant="h6">Attendance Status</Typography>
                        {attendanceList.map((student) => (
                            <Typography key={student.id}>
                                {student.firstName} {student.surname} - {student.status}
                            </Typography>
                        ))}
                    </Paper>
                </>
            )}
        </Container>
    );
};

export default Attendance;
