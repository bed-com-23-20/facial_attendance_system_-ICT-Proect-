import React, { useState, useEffect, useRef } from 'react';
import { Container, Typography, TextField, MenuItem, Button, Grid, Paper } from '@mui/material';
import Webcam from 'react-webcam';

const Attendance = ({ courses = [], students = [], onAttendanceSubmit }) => {
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [attendanceData, setAttendanceData] = useState({});
  const [timeLeft, setTimeLeft] = useState(30 * 60); // 30 minutes
  const [isTakingAttendance, setIsTakingAttendance] = useState(false);
  const webcamRef = useRef(null);

  // Filter students based on selected course
  useEffect(() => {
    if (selectedCourse) {
      const enrolled = students.filter(student =>
        student.courses?.includes(selectedCourse)
      );

      setSelectedStudents(enrolled);

      const initial = enrolled.reduce((acc, student) => {
        acc[student.id] = { status: 'Not Checked', faceCaptured: false };
        return acc;
      }, {});
      setAttendanceData(initial);
    }
  }, [selectedCourse, students]);

  // Timer countdown and auto-submit
  useEffect(() => {
    if (!isTakingAttendance) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          finalizeAttendance();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isTakingAttendance]);

  const finalizeAttendance = () => {
    const updated = { ...attendanceData };
    Object.keys(updated).forEach((id) => {
      if (!updated[id].faceCaptured) {
        updated[id].status = 'Late';
      }
    });
    setAttendanceData(updated);
    setIsTakingAttendance(false);
    onAttendanceSubmit(updated);
  };

  const handleCourseChange = (event) => {
    setSelectedCourse(event.target.value);
    setIsTakingAttendance(false); // reset if changing course
    setTimeLeft(30 * 60);
  };

  const handleCaptureFace = async (studentId) => {
    if (!webcamRef.current) return;
    const imageSrc = webcamRef.current.getScreenshot();

    try {
      const res = await fetch('/api/attendance/verify-face', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ studentId, course: selectedCourse, image: imageSrc }),
      });

      const data = await res.json();

      setAttendanceData(prev => ({
        ...prev,
        [studentId]: {
          status: data.matched ? 'Present' : 'Not Matched',
          faceCaptured: true,
        }
      }));
    } catch (err) {
      console.error('Face verification error:', err);
    }
  };

  const handleStartAttendance = async () => {
    setIsTakingAttendance(true);
    setTimeLeft(30 * 60);

    // Sequential capture (or you can parallelize with Promise.all if backend supports it)
    for (const student of selectedStudents) {
      await handleCaptureFace(student.id);
    }
  };

  const formatTime = (secs) => {
    const min = Math.floor(secs / 60);
    const sec = secs % 60;
    return `${min}:${sec < 10 ? '0' : ''}${sec}`;
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Take Attendance</Typography>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            select
            label="Select Course"
            fullWidth
            value={selectedCourse}
            onChange={handleCourseChange}
          >
            {courses.length > 0 ? (
              courses.map(course => (
                <MenuItem key={course} value={course}>{course}</MenuItem>
              ))
            ) : (
              <MenuItem value="">No courses available</MenuItem>
            )}
          </TextField>
        </Grid>

        {selectedCourse && (
          <>
            <Grid item xs={12}>
              <Typography variant="h6">
                Students Enrolled in {selectedCourse}
              </Typography>
              <Paper sx={{ p: 2 }}>
                <Grid container spacing={2}>
                  {selectedStudents.length > 0 ? (
                    selectedStudents.map(student => (
                      <Grid item xs={12} key={student.id}>
                        <Typography variant="body1">
                          {student.firstName} {student.surname} — Status: <strong>{attendanceData[student.id]?.status}</strong>
                        </Typography>
                      </Grid>
                    ))
                  ) : (
                    <Typography>No students enrolled for this course.</Typography>
                  )}
                </Grid>
              </Paper>
            </Grid>

            <Grid item xs={12}>
              <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                width="100%"
                videoConstraints={{ facingMode: "user" }}
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleStartAttendance}
                disabled={isTakingAttendance}
              >
                Start Attendance
              </Button>
            </Grid>

            {isTakingAttendance && (
              <Grid item xs={12}>
                <Typography variant="h6">
                  Time Left: {formatTime(timeLeft)}
                </Typography>
              </Grid>
            )}
          </>
        )}
      </Grid>
    </Container>
  );
};

export default Attendance;
