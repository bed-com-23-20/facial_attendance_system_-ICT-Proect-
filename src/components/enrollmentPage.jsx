import React, { useState, useEffect } from 'react';

const EnrollmentPage = () => {
    const [students, setStudents] = useState([
        { name: "Alice Johnson", program: "Computer Science", year: "2023" },
        { name: "Bob Smith", program: "Mathematics", year: "2024" },
        { name: "Charlie Brown", program: "Physics", year: "2023" },
        { name: "Diana Prince", program: "Engineering", year: "2025" }
    ]);
    const [markedStudents, setMarkedStudents] = useState(new Set());
    const [searchInput, setSearchInput] = useState('');
    const [filterType, setFilterType] = useState('name');
    const [filterValue, setFilterValue] = useState('');
    const [filteredStudents, setFilteredStudents] = useState(students);

    useEffect(() => {
        setFilteredStudents(students);
    }, [students]);

    const toggleMark = (index) => {
        const newMarkedStudents = new Set(markedStudents);
        if (newMarkedStudents.has(index)) {
            newMarkedStudents.delete(index);
        } else {
            newMarkedStudents.add(index);
        }
        setMarkedStudents(newMarkedStudents);
    };

    const markAll = () => {
        const allMarked = new Set(students.map((_, index) => index));
        setMarkedStudents(allMarked);
    };

    const logMarkedStudents = () => {
        const marked = Array.from(markedStudents).map(index => students[index].name);
        console.log("Marked Students:", marked);
    };

    const searchStudents = (e) => {
        const value = e.target.value.toLowerCase();
        setSearchInput(value);
        const filtered = students.filter(student =>
            student.name.toLowerCase().includes(value) ||
            student.program.toLowerCase().includes(value) ||
            student.year.includes(value)
        );
        setFilteredStudents(filtered);
    };

    const applyFilter = () => {
        const filtered = students.filter(student =>
            student[filterType].toLowerCase().includes(filterValue.toLowerCase())
        );
        setFilteredStudents(filtered);
    };

    return (
        <div className="bg-gray-100 text-gray-800">
            <header className="bg-blue-600 text-white p-4">
                <div className="flex items-center space-x-4">
                    <input
                        type="text"
                        placeholder="Search by name, program, or year"
                        className="p-2 rounded-lg text-gray-800"
                        value={searchInput}
                        onChange={searchStudents}
                    />
                    <button onClick={markAll} className="bg-yellow-500 text-white px-4 py-2 rounded-lg">Mark All</button>
                    <button onClick={logMarkedStudents} className="bg-green-500 text-white px-4 py-2 rounded-lg">Log Marked</button>
                    <div className="flex items-center space-x-4">
                        <select
                            className="p-2 rounded-lg text-gray-800"
                            value={filterType}
                            onChange={(e) => setFilterType(e.target.value)}
                        >
                            <option value="name">Name</option>
                            <option value="program">Program</option>
                            <option value="year">Year</option>
                        </select>
                        <input
                            type="text"
                            placeholder="Enter filter value"
                            className="p-2 rounded-lg text-gray-800"
                            value={filterValue}
                            onChange={(e) => setFilterValue(e.target.value)}
                        />
                        <button onClick={applyFilter} className="bg-blue-500 text-white px-4 py-2 rounded-lg">Apply Filter</button>
                    </div>
                </div>
            </header>
            <main className="p-6">
                <section className="bg-white shadow-md rounded-lg p-4">
                    <h2 className="text-xl font-semibold mb-2">Student List</h2>
                    <div className="overflow-y-auto max-h-64">
                        <table className="table-auto w-full text-left border-collapse">
                            <thead>
                                <tr>
                                    <th className="border px-4 py-2">Mark</th>
                                    <th className="border px-4 py-2">Name</th>
                                    <th className="border px-4 py-2">Program</th>
                                    <th className="border px-4 py-2">Year</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredStudents.map((student, index) => (
                                    <tr key={index} className="hover:bg-gray-200 cursor-pointer">
                                        <td className="border px-4 py-2">
                                            <input
                                                type="checkbox"
                                                checked={markedStudents.has(index)}
                                                onChange={() => toggleMark(index)}
                                            />
                                        </td>
                                        <td className="border px-4 py-2">{student.name}</td>
                                        <td className="border px-4 py-2">{student.program}</td>
                                        <td className="border px-4 py-2">{student.year}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
            </main>
            <footer className="bg-gray-800 text-white text-center p-4 mt-6">
                <p>&copy; 2023 My App. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default EnrollmentPage;