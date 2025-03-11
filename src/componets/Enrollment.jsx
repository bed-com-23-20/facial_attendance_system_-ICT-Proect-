import React from 'react';

const Enrollment = () => {
    return (
        <div style={{ padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <label>
                        School
                        <select style={{ marginLeft: '10px' }}>
                            <option>Select a school</option>
                            {["UNIMA", "MUBAS", "LUANAR", "MUST", "MZUNI", "KUHES"].map(school => (
                                <option key={school} value={school}>{school}</option>
                            ))}
                        </select>
                    </label>
                </div>
                <div>
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
                <div>
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
                <div>
                    <span style={{ fontWeight: 'bold' }}>Academic Year</span>
                    <span style={{ color: 'red', marginLeft: '5px' }}>2025</span>
                </div>
            </div>
        </div>
    );
};

export default Enrollment;