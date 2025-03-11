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
                            {/* Add school options here */}
                        </select>
                    </label>
                </div>
                <div>
                    <label>
                        Grade
                        <select style={{ marginLeft: '10px' }}>
                            <option>Select a grade</option>
                            {/* Add grade options here */}
                        </select>
                    </label>
                </div>
                <div>
                    <label>
                        Class/Section
                        <select style={{ marginLeft: '10px' }}>
                            <option>Select a class</option>
                            {/* Add class options here */}
                        </select>
                    </label>
                </div>
                <div>
                    <span style={{ fontWeight: 'bold' }}>Academic Year</span>
                    <span style={{ color: 'red', marginLeft: '5px' }}>2024</span>
                </div>
            </div>
        </div>
    );
};

export default Enrollment;