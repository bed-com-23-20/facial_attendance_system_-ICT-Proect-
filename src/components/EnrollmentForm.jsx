
import React, { useState, useEffect } from 'react';
import { recordAttendance, registerStudent } from '../integration';

const EnrollmentForm = ({ school, orgId,onSubmit, editingEnrollment }) => {
    const [formData, setFormData] = useState({
        school: school || '',
        academicYear: '',
        yearOfStudy: '',
        programOfStudy: '',
        enrollmentDate: '',
        firstName: '',
        surname: '',
        gender: '',
        dateOfBirth: '',
        nationality: '',
        guardianName: '',
        profilePicture: '',
    });


   const DataForm =(obj) => {
        const form = new FormData();
      
        // Map object fields to FormData
        form.append('school', obj.school);
        form.append('academicYear', obj.academicYear);
        form.append('yearOfStudy', obj.yearOfStudy);
        form.append('programOfStudy', obj.programOfStudy);
        form.append('enrollmentDate', obj.enrollmentDate);
        form.append('profilePictureInput', obj.profilePicture || ''); // If null, put empty string
        form.append('firstName', obj.firstName);
        form.append('surname', obj.surname);
        form.append('gender', obj.gender);
        form.append('dob', obj.dateOfBirth); // Make sure this key matches what registerStudent expects
        form.append('Nationality', obj.nationality);
        form.append('guardian', obj.guardianName);
        form.append('regNumber', obj.regNumber);
      
        // Now pass it to registerStudent
        registerStudent(form,orgId);
      }
      

    useEffect(() => {
        if (editingEnrollment) {
            setFormData({
                ...editingEnrollment,
                enrollmentDate: editingEnrollment.enrollmentDate || '',
                dateOfBirth: editingEnrollment.dateOfBirth || '',
            });
        }
    }, [editingEnrollment]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
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
        DataForm(formData);
        onSubmit(formData);
    };

    const handleCancel = () => {
        setFormData({
            regNumber: '',
            school: school || '',
            academicYear: '',
            yearOfStudy: '',
            programOfStudy: '',
            enrollmentDate: '',
            firstName: '',
            surname: '',
            gender: '',
            dateOfBirth: '',
            nationality: '',
            guardianName: '',
            profilePicture: null,
        });
        onSubmit();
    };

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
            <h2>Student Enrollment Form</h2>
            <form onSubmit={handleSubmit}>
                <h3>Enrollment Details</h3>

                <div style={{ marginBottom: '15px' }}>
                    <label>School</label>
                    <input
                        type="text"
                        name="school"
                        value={formData.school}
                        onChange={handleChange}
                        disabled
                        style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                    />
                    <small>This is the school selected for enrollment</small>
                </div>

                <div style={{ marginBottom: '15px' }}>
                    <label>Registration Number</label>
                    <input
                        type="text"
                        name="regNumber"
                        value={formData.regNumber}
                        onChange={handleChange}
                        style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                    />
                </div>

                <div style={{ marginBottom: '15px' }}>
                    <label>Academic Year</label>
                    <select
                        name="academicYear"
                        value={formData.academicYear}
                        onChange={handleChange}
                        style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                    >
                        <option value="">Select Year</option>
                        <option value="2024-2025">2024-2025</option>
                        <option value="2025-2026">2025-2026</option>
                    </select>
                    <small>Check that academic year matches the enrollment year</small>
                </div>

                <div style={{ marginBottom: '15px' }}>
                    <label>Year of Study</label>
                    <select
                        name="yearOfStudy"
                        value={formData.yearOfStudy}
                        onChange={handleChange}
                        style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                    >
                        <option value="">Select Year</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                </div>

                <div style={{ marginBottom: '15px' }}>
                    <label>Program of Study</label>
                    <select
                        name="programOfStudy"
                        value={formData.programOfStudy}
                        onChange={handleChange}
                        style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                    >
                        <option value="">Select Program</option>
                        <option value="ComputerScience">Computer Science</option>
                        <option value="Statistics">Statistics</option>
                        <option value="PoliticalScience">Political Science</option>
                        <option value="Arts">Bachelor of Arts</option>
                        <option value="InformationSystem">Information System</option>
                    </select>
                </div>

                <div style={{ marginBottom: '15px' }}>
                    <label>Enrollment Date</label>
                    <input
                        type="date"
                        name="enrollmentDate"
                        value={formData.enrollmentDate}
                        onChange={handleChange}
                        style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                    />
                </div>

                <h3 style={{ marginTop: '30px' }}>Student Profile</h3>

                <div style={{ textAlign: 'center', marginBottom: '20px' }}>
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
                            <button
                                type="button"
                                style={{
                                    position: 'absolute',
                                    bottom: '10px',
                                    right: '10px',
                                    borderRadius: '50%',
                                    padding: '5px',
                                    backgroundColor: '#1976d2',
                                    color: 'white',
                                    border: 'none',
                                    cursor: 'pointer'
                                }}
                                onClick={() => document.getElementById('profilePictureInput').click()}
                            >
                                ✏️
                            </button>
                        </div>
                    ) : (
                        <button
                            type="button"
                            style={{
                                padding: '10px 20px',
                                backgroundColor: '#1976d2',
                                color: 'white',
                                border: 'none',
                                cursor: 'pointer',
                                borderRadius: '5px'
                            }}
                            onClick={() => document.getElementById('profilePictureInput').click()}
                        >
                            Upload Profile Picture
                        </button>
                    )}
                    <input
                        id="profilePictureInput"
                        type="file"
                        accept="image/*"
                        style={{ display: 'none' }}
                        onChange={handleFileChange}
                    />
                </div>

                <div style={{ marginBottom: '15px' }}>
                    <label>First Name</label>
                    <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                    />
                </div>

                <div style={{ marginBottom: '15px' }}>
                    <label>Surname</label>
                    <input
                        type="text"
                        name="surname"
                        value={formData.surname}
                        onChange={handleChange}
                        style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                    />
                </div>

                <div style={{ marginBottom: '15px' }}>
                    <label>Gender</label>
                    <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                    >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                </div>

                <div style={{ marginBottom: '15px' }}>
                    <label>Date of Birth</label>
                    <input
                        type="date"
                        name="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={handleChange}
                        style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                    />
                </div>

                <div style={{ marginBottom: '15px' }}>
                    <label>Nationality</label>
                    <input
                        type="text"
                        name="nationality"
                        value={formData.nationality}
                        onChange={handleChange}
                        style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                    />
                </div>

                <div style={{ marginBottom: '15px' }}>
                    <label>Guardian's Name</label>
                    <input
                        type="text"
                        name="guardianName"
                        value={formData.guardianName}
                        onChange={handleChange}
                        style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                    />
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
                    <button
                        type="button"
                        onClick={handleCancel}
                        style={{
                            width: '48%',
                            padding: '10px',
                            backgroundColor: '#d32f2f',
                            color: 'white',
                            border: 'none',
                            cursor: 'pointer',
                            borderRadius: '5px'
                        }}
                    >
                        Clear and Cancel
                    </button>
                    <button
                        type="submit"
                        style={{
                            width: '48%',
                            padding: '10px',
                            backgroundColor: '#1976d2',
                            color: 'white',
                            border: 'none',
                            cursor: 'pointer',
                            borderRadius: '5px'
                        }}
                    >
                        Save and Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EnrollmentForm;
