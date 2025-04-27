// import React, { useState, useEffect } from 'react';
// import { listTrackedEntityInstances } from '../integration';

// const EnrollmentPage = ({ orgUnit }) => {
//   const [students, setStudents] = useState([]);
//   const [markedStudents, setMarkedStudents] = useState(new Set());
//   const [searchInput, setSearchInput] = useState('');
//   const [selectedSchoolId, setSelectedSchoolId] = useState('');
//   const [orgUnits, setOrgUnits] = useState([]);
//   const [orgUnitsId, setOrgUnitsId] = useState('');

//   // This will calculate dynamic column headers based on the fetched students
//   const allKeys = [...new Set(students.flatMap(student => Object.keys(student)))];

//   // Load initial schools (org units)
//   useEffect(() => {
//     setOrgUnits(orgUnit);
//   }, [orgUnit]);

//   // Fetch students whenever a school is selected
//   useEffect(() => {
//     if (orgUnitsId) {
//       getEntities();
//     }
//   }, [orgUnitsId]);

//   // Fetch students (trackedEntityInstances) from DHIS2 server
//   const getEntities = async () => {
//     try {
//       const response = await listTrackedEntityInstances(orgUnitsId);
//       if (response?.trackedEntityInstances?.length > 0) {
//         const mappedStudents = response.trackedEntityInstances.map(instance => {
//           const attributes = {};
//           instance.attributes.forEach(attr => {
//             attributes[attr.code] = attr.value;
//           });
//           return attributes;
//         });
//         setStudents(mappedStudents);
//       } else {
//         setStudents([]);
//       }
//     } catch (error) {
//       console.error('Error fetching entities:', error);
//     }
//   };

//   const handleSchoolChange = (e) => {
//     const selectedId = e.target.value;
//     setSelectedSchoolId(selectedId);
//     const selectedSchool = orgUnits.find(item => item.id === selectedId);
//     if (selectedSchool) {
//       setOrgUnitsId(selectedSchool.id);
//     }
//   };

//   const toggleMark = (index) => {
//     const newMarked = new Set(markedStudents);
//     if (newMarked.has(index)) {
//       newMarked.delete(index);
//     } else {
//       newMarked.add(index);
//     }
//     setMarkedStudents(newMarked);
//   };

//   const markAll = () => {
//     const allMarked = new Set(students.map((_, index) => index));
//     setMarkedStudents(allMarked);
//   };

//   const logMarkedStudents = () => {
//     const marked = Array.from(markedStudents).map(index => students[index]);
//     console.log("Marked Students:", marked);
//   };

//   const searchStudents = (e) => {
//     const value = e.target.value.toLowerCase();
//     setSearchInput(value);
//   };

//   const filteredStudents = students.filter(student =>
//     allKeys.some(key => student[key]?.toString().toLowerCase().includes(searchInput))
//   );

//   return (
//     <div className="bg-gray-100 min-h-screen text-gray-800">
//       <header className="bg-blue-600 text-white p-4 flex flex-wrap items-center space-x-4">
//         <div>
//           <select
//             className="text-black p-2 rounded-lg w-full"
//             value={selectedSchoolId}
//             onChange={handleSchoolChange}
//           >
//             <option value="">Select a school</option>
//             {orgUnits.map(item => (
//               <option key={item.id} value={item.id}>
//                 {item.name}
//               </option>
//             ))}
//           </select>
//         </div>

//         <input
//           type="text"
//           placeholder="Search students..."
//           className="p-2 rounded-lg text-gray-800"
//           value={searchInput}
//           onChange={searchStudents}
//         />

//         <button
//           onClick={markAll}
//           className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg"
//         >
//           Mark All
//         </button>

//         <button
//           onClick={logMarkedStudents}
//           className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
//         >
//           Log Marked
//         </button>
//       </header>

//       <main className="p-6">
//         <section className="bg-white shadow-md rounded-lg p-4 overflow-auto">
//           <h2 className="text-2xl font-semibold mb-4">Student List</h2>

//           <table className="table-auto w-full text-left border-collapse">
//             <thead>
//               <tr>
//                 <th className="border px-4 py-2">Mark</th>
//                 {allKeys.map(key => (
//                   <th key={key} className="border px-4 py-2 capitalize">
//                     {key}
//                   </th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody>
//               {filteredStudents.map((student, index) => (
//                 <tr key={index} className="hover:bg-gray-200">
//                   <td className="border px-4 py-2">
//                     <input
//                       type="checkbox"
//                       checked={markedStudents.has(index)}
//                       onChange={() => toggleMark(index)}
//                     />
//                   </td>
//                   {allKeys.map(key => (
//                     <td key={key} className="border px-4 py-2">
//                       {student[key] || 'N/A'}
//                     </td>
//                   ))}
//                 </tr>
//               ))}
//             </tbody>
//           </table>

//           {filteredStudents.length === 0 && (
//             <p className="text-center text-gray-500 mt-4">No students found.</p>
//           )}
//         </section>
//       </main>
//     </div>
//   );
// };

// export default EnrollmentPage;
import React, { useState, useEffect } from 'react';
import { listTrackedEntityInstances } from '../integration';

const EnrollmentPage = ({ orgUnit }) => {
  const [students, setStudents] = useState([]);
  const [markedStudents, setMarkedStudents] = useState(new Set());
  const [searchInput, setSearchInput] = useState('');
  const [selectedSchoolId, setSelectedSchoolId] = useState('');
  const [orgUnits, setOrgUnits] = useState([]);
  const [orgUnitsId, setOrgUnitsId] = useState('');

  useEffect(() => {
    setOrgUnits(orgUnit);
  }, [orgUnit]);

  useEffect(() => {
    if (orgUnitsId) {
      getEntities();
    }
  }, [orgUnitsId]);

  const getEntities = async () => {
    try {
      const response = await listTrackedEntityInstances(orgUnitsId);
      if (response?.trackedEntityInstances?.length > 0) {
        const mappedStudents = response.trackedEntityInstances.map((instance) => {
          const attributes = instance.attributes.reduce((acc, attribute) => {
            acc[attribute.code] = attribute.value;
            return acc;
          }, {});

          return {
            name: attributes.fname || 'N/A', // mapped from code 'fname'
            program: 'unknown',               // no program given in attributes
            year: attributes.ages || 'N/A',   // mapped from code 'ages'
          };
        });
        setStudents(mappedStudents);
      } else {
        setStudents([]);
      }
    } catch (error) {
      console.error('Error fetching entities:', error);
    }
  };

  const handleSchoolChange = (e) => {
    const selectedId = e.target.value;
    setSelectedSchoolId(selectedId);
    const selectedSchool = orgUnits.find(item => item.id === selectedId);
    if (selectedSchool) {
      setOrgUnitsId(selectedSchool.id);
    }
  };

  const toggleMark = (index) => {
    const newMarked = new Set(markedStudents);
    if (newMarked.has(index)) {
      newMarked.delete(index);
    } else {
      newMarked.add(index);
    }
    setMarkedStudents(newMarked);
  };

  const markAll = () => {
    const allMarked = new Set(students.map((_, index) => index));
    setMarkedStudents(allMarked);
  };

  const logMarkedStudents = () => {
    const marked = Array.from(markedStudents).map(index => students[index]);
    console.log("Marked Students:", marked);
  };

  const searchStudents = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchInput(value);
  };

  const filteredStudents = students.filter(student =>
    student.name?.toLowerCase().includes(searchInput) ||
    student.program?.toLowerCase().includes(searchInput) ||
    student.year?.toString().includes(searchInput)
  );

  return (
    <div className="bg-gray-100 min-h-screen text-gray-800">
      <header className="bg-blue-600 text-white p-4 flex flex-wrap items-center space-x-4">
        <div>
          <select
            className="text-black p-2 rounded-lg w-full"
            value={selectedSchoolId}
            onChange={handleSchoolChange}
          >
            <option value="">Select a school</option>
            {orgUnits.map(item => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>

        <input
          type="text"
          placeholder="Search students..."
          className="p-2 rounded-lg text-gray-800"
          value={searchInput}
          onChange={searchStudents}
        />

        <button
          onClick={markAll}
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg"
        >
          Mark All
        </button>

        <button
          onClick={logMarkedStudents}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
        >
          Log Marked
        </button>
      </header>

      <main className="p-6">
        <section className="bg-white shadow-md rounded-lg p-4 overflow-auto">
          <h2 className="text-2xl font-semibold mb-4">Student List</h2>

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
                <tr key={index} className="hover:bg-gray-200">
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

          {filteredStudents.length === 0 && (
            <p className="text-center text-gray-500 mt-4">No students found.</p>
          )}
        </section>
      </main>
    </div>
  );
};

export default EnrollmentPage;
