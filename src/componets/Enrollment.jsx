import React, { useState } from 'react';
//import 'font-awesome/css/font-awesome.min.css';

const Enrollment = () => {
    const [selectedSchool, setSelectedSchool] = useState('');

    const handleSchoolChange = (event) => {
        setSelectedSchool(event.target.value);
    };

    return (
        <div style={{ padding: '10px' }}>
            <div style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '20px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', fontSize: '18px', fontFamily: 'Roboto, sans-serif' }}> 
                    <div> 
                        <label>
                            School
                            <select style={{ marginLeft: '10px' }} onChange={handleSchoolChange}>
                                <option value="">Select a school</option>
                                {["UNIMA", "MUBAS", "LUANAR", "MUST", "MZUNI", "KUHES"].map(school => (
                                    <option key={school} value={school}>{school}</option>
                                ))}
                            </select>
                        </label>
                    </div>
                    <div style={{ marginLeft: '20px' }}>
                        <label>
                            Grade
                            <select style={{ marginLeft: '10px' }}>
                                <option>Select a year</option>
                                {[1, 2, 3, 4, 5].map(grade => (
                                    <option key={grade} value={grade}>{grade}</option>
                                ))}
                            </select>
                        </label>
                    </div>
                    <div style={{ marginLeft: '20px' }}>
                        <label>
                            Program
                            <select style={{ marginLeft: '10px' }}>
                                <option>Program of Study</option>
                                {["Computer Science", "Statistics", "Political Science", "Bachelor of Arts", "Information System"].map(program => (
                                    <option key={program} value={program}>{program}</option>
                                ))}
                            </select>
                        </label>
                    </div>
                    <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center' }}>
                        <span style={{ fontWeight: 'bold' }}>Academic Year</span>
                        <span style={{ color: 'red', marginLeft: '5px' }}>2025</span>
                    </div>
                </div>
            </div>
            {selectedSchool ? (
                <div style={{ marginTop: '20px' }}>
                    <h2>Enrollments</h2>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}> 
                        <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                            <input type="text" placeholder="Search Student" style={{ padding: '5px', borderRadius: '4px', border: '1px solid #ccc', paddingLeft: '30px' }} /> 
                            <i className="fas fa-search" style={{ position: 'absolute', left: '10px', color: '#ccc' }}></i>
                        </div>
                        <button style={{ marginLeft: '10px' }}>
                            <i className="fas fa-user-plus" style={{ marginRight: '5px' }}></i>
                            Enroll Student
                        </button>
                        <button style={{ marginLeft: '10px' }}>
                            <i className="fas fa-download" style={{ marginRight: '5px' }}></i> 
                            Download PDF
                        </button>
                    </div>
                </div>
            ) : (
                <div style={{display: "flex", justifyContent: "center", alignItems: "flex-start", height: "100vh", fontSize: "1rem",
                    fontFamily: "Roboto, sans-serif",
                    backgroundColor: "#f4f4f4",
                    padding: "20px"
                }}>
                    <div style={{
                        padding: "20px",
                        backgroundColor: "#fff",
                        borderRadius: "10px",
                        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                        maxWidth: "700px",
                        width: "90%",
                        textAlign: "left",
                        minHeight: "200px",
                        marginTop: "100px"
                    }}>
                        <h3>SEMIS-Enrollment</h3>
                        <p>Follow the instructions to proceed:</p>
                        <ul>
                            <li>Select the Organization unit you want to view data</li>
                            <li>Use global filters (Class, Grade, and Academic Year)</li>
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Enrollment;