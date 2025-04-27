import React, { useState, useEffect } from 'react';
import { recordAttendance, registerStudent } from '../integration';

const EnrollmentForm = ({ school, orgId, onSubmit, editingEnrollment }) => {
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

    const DataForm = (obj) => {
        const form = new FormData();
        form.append('school', obj.school);
        form.append('academicYear', obj.academicYear);
        form.append('yearOfStudy', obj.yearOfStudy);
        form.append('programOfStudy', obj.programOfStudy);
        form.append('enrollmentDate', obj.enrollmentDate);
        form.append('profilePictureInput', obj.profilePicture || '');
        form.append('firstName', obj.firstName);
        form.append('surname', obj.surname);
        form.append('gender', obj.gender);
        form.append('dob', obj.dateOfBirth);
        form.append('Nationality', obj.nationality);
        form.append('guardian', obj.guardianName);
        form.append('regNumber', obj.regNumber);
        registerStudent(form, orgId);
    };

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
        <div className=" mx-auto px-2 shadow-lg rounded-lg">
            <h2 className="text-3xl font-bold mb-6 text-center text-blue-800">Student Enrollment Form</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-700">Enrollment Details</h3>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">School</label>
                        <input
                            type="text"
                            name="school"
                            value={formData.school}
                            onChange={handleChange}
                            disabled
                            className="mt-1 block w-full rounded-md border h-10 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                        <small className="text-gray-500">This is the school selected for enrollment</small>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Registration Number</label>
                        <input
                            type="text"
                            name="regNumber"
                            value={formData.regNumber}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border h-10 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Academic Year</label>
                        <select
                            name="academicYear"
                            value={formData.academicYear}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border h-10 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        >
                            <option value="">Select Year</option>
                            <option value="2024-2025">2024-2025</option>
                            <option value="2025-2026">2025-2026</option>
                        </select>
                        <small className="text-gray-500">Check that academic year matches the enrollment year</small>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Year of Study</label>
                        <select
                            name="yearOfStudy"
                            value={formData.yearOfStudy}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border h-10 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        >
                            <option value="">Select Year</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Program of Study</label>
                        <select
                            name="programOfStudy"
                            value={formData.programOfStudy}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border h-10 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        >
                            <option value="">Select Program</option>
                            <option value="ComputerScience">Computer Science</option>
                            <option value="Statistics">Statistics</option>
                            <option value="PoliticalScience">Political Science</option>
                            <option value="Arts">Bachelor of Arts</option>
                            <option value="InformationSystem">Information System</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Enrollment Date</label>
                        <input
                            type="date"
                            name="enrollmentDate"
                            value={formData.enrollmentDate}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border h-10 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                    </div>
                </div>

                <h3 className="text-xl font-semibold text-gray-700">Student Profile</h3>

                <div className="flex flex-col items-center">
                    {formData.profilePicture ? (
                        <div className="relative">
                            <img
                                src={formData.profilePicture}
                                alt="Profile Preview"
                                className="w-36 h-36 rounded-full object-cover border-2 border-gray-300"
                            />
                            <button
                                type="button"
                                className="absolute bottom-2 right-2 bg-blue-500 text-white p-2 rounded-full shadow-md"
                                onClick={() => document.getElementById('profilePictureInput').click()}
                            >
                                ✏️
                            </button>
                        </div>
                    ) : (
                        <button
                            type="button"
                            className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-md"
                            onClick={() => document.getElementById('profilePictureInput').click()}
                        >
                            Upload Profile Picture
                        </button>
                    )}
                    <input
                        id="profilePictureInput"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleFileChange}
                    />
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">First Name</label>
                        <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border h-10 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Surname</label>
                        <input
                            type="text"
                            name="surname"
                            value={formData.surname}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border h-10 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Gender</label>
                        <select
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border h-10 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        >
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
                        <input
                            type="date"
                            name="dateOfBirth"
                            value={formData.dateOfBirth}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border h-10 p-2shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Nationality</label>
                        <input
                            type="text"
                            name="nationality"
                            value={formData.nationality}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border h-10 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Guardian's Name</label>
                        <input
                            type="text"
                            name="guardianName"
                            value={formData.guardianName}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border h-10 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                    </div>
                </div>

                <div className="flex justify-between mt-6">
                    <button
                        type="button"
                        onClick={handleCancel}
                        className="w-1/2 mr-2 py-2 bg-red-500 text-white rounded-md shadow-md hover:bg-red-600"
                    >
                        Clear and Cancel
                    </button>
                    <button
                        type="submit"
                        className="w-1/2 ml-2 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600"
                    >
                        Save and Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EnrollmentForm;
