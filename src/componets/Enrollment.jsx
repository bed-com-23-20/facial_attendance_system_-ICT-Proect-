import React, { useState } from 'react';

const Enrollment = () => {
    const [selectedSchool, setSelectedSchool] = useState('');

    const handleSchoolChange = (event) => {
        setSelectedSchool(event.target.value);
    };

    return (
        <div style={{ padding: '10px' }}>
            <div style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '20px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', fontSize: '18px', fontFamily: 'Arial', }}> 
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
            {selectedSchool && (
                <div style={{ marginTop: '20px' }}>
                    <h2>Enrollments</h2>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}> 
                        <button style={{ marginLeft: '10px' }}>Search student</button>
                        <button style={{ marginLeft: '10px' }}>Enroll student</button>
                        <button style={{ marginLeft: '10px' }}>Download PDF</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Enrollment;