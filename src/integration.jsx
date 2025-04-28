import React, { useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';

// <---- STARTS HERE ---->

const BASE_URL = 'http://localhost:8081';
const AUTH = 'Basic ' + btoa('admin:district'); // Change credentials if needed
let EntityId='bb62ffk4ktU';


// all required function for enrollment functionality
export async function getTrackedEntityTypes(baseUrl, accessToken) {
  const url = `${baseUrl}/api/trackedEntityTypes.json?fields=id,name&paging=false`;

  try {
      const response = await fetch(url, {
          headers: {
              Authorization: accessToken,
              'Content-Type': 'application/json',
          },
      });

      if (!response.ok) {
          throw new Error(`Failed to fetch tracked entity types: ${response.statusText}`);
      }

      const data = await response.json();
      const trackedEntityType = data.trackedEntityTypes.map(unit => ({
          id: unit.id,
          name: unit.name,
      }));
      return trackedEntityType
  } catch (error) {
      console.error('Error fetching tracked entity types:', error);
      throw error;
  }
}
// function displayEntityList(items) {
// const outputElement = document.getElementById('output1');
// outputElement.innerHTML = ''; // Clear previous content

// const ul = document.createElement('ul');

// items.forEach(item => {
//   const li = document.createElement('li');
//   li.textContent = `${item.name} (${item.id})`;
//   li.style.cursor = 'pointer';

//   li.onclick = () => {
//     EntityId=item.id;
//     console.log(`Name: ${item.name}, ID: ${item.id}`);
//   };

//   ul.appendChild(li);
// });

// outputElement.appendChild(ul);
// }

// function displayOrgList(items) {
// const outputElement = document.getElementById('output2');
// outputElement.innerHTML = ''; // Clear previous content

// const ul = document.createElement('ul');

// items.forEach(item => {
//   const li = document.createElement('li');
//   li.textContent = `${item.name} (${item.id})`;
//   li.style.cursor = 'pointer';

//   li.onclick = () => {
//     ordId=item.id
//     listTrackedEntityInstances(ordId)
//     console.log(`Name: ${item.name}, ID: ${item.id}`);
//   };

//   ul.appendChild(li);
// });

// outputElement.appendChild(ul);
// }


export async function fetchOrganisationUnits() {
  const url = 'http://localhost:8081/api/organisationUnits.json';
  const headers = new Headers();
  headers.append('Authorization', 'Basic ' + btoa('admin:district'));

  try {
      const response = await fetch(url, { headers: headers });
      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      const organisationUnits = data.organisationUnits.map(unit => ({
          id: unit.id,
          name: unit.displayName,
      }));
      return organisationUnits;
  } catch (error) {
      console.error('Error fetching organisation units:', error);
      alert('Failed to fetch organisation units. Check the console for details.');
  }
}
// getTrackedEntityTypes(BASE_URL,AUTH)
// fetchOrganisationUnits() 

export async function registerStudent(form, orgId, loading) {
  const profilePicture = form.get('profilePictureInput');

  const attributes = [
    { attribute: "mmFgrN2oj6j", value: form.get('school') },
    { attribute: "hVZmLsS7oIu", value: form.get('academicYear') },
    { attribute: "Sg4zAy8CAsV", value: form.get('yearOfStudy') },
    { attribute: "RAzUf1PE5dJ", value: form.get('programOfStudy') },
    { attribute: "o7qXV3EGIeq", value: form.get('enrollmentDate') },
    { attribute: "MPpBF8ba0il", value: form.get('firstName') },
    { attribute: "wO9nqCGAAC1", value: form.get('surname') },
    { attribute: "SxF7h6hwEo1", value: form.get('gender') },
    { attribute: "qlF7eQUwqsK", value: form.get('dob') },
    { attribute: "swYDOfz0g3W", value: form.get('Nationality') },
    { attribute: "ty0MMgWOtwT", value: form.get('guardian') },
    { attribute: "EgbkEerDZET", value: form.get('regNumber') },
  ];

  if (profilePicture && profilePicture.trim() !== '') {
    attributes.push({ attribute: "X2qaU4UdHRZ", value: profilePicture });
  }

  const payload = {
    trackedEntityType: EntityId,
    orgUnit: orgId,
    attributes: attributes,
  };

  try {
    const res = await fetch(`http://localhost:8081/api/trackedEntityInstances`, {
      method: 'POST',
      headers: {
        'Authorization': AUTH,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const result = await res.json();
    console.log("Registration response:", result);

    if (res.ok) {
      alert('Registration successful');
      const trackedEntityInstanceId = result.response.importSummaries[0].reference; 
      // 👆 important: this is how you get the registered TEI ID
     const isLoading= await enrollStudent(trackedEntityInstanceId, orgId,loading);
     return isLoading;

    } else {
      alert('Registration failed');
    }
  }
  catch (error) {
    alert('Error while registering student');
    console.error(error);
  }
}

// <---- ENDS HERE ---->


//<---- All functions related to enroment functionality --->
export async function listTrackedEntityInstances(orgUnit) {
const res = await fetch(`${BASE_URL}/api/trackedEntityInstances?ou=${orgUnit}`, {
  method: 'GET',
  headers: {
    'Authorization': AUTH,
    'Content-Type': 'application/json'
  }
});

const result = await res.json();
return result;

}

//enrolling a student into particular program
export async function enrollStudent(trackedEntityInstanceId, orgUnitId,loading) {
  const payload = {
    trackedEntityInstance: trackedEntityInstanceId,
    program: "dhQHvVG0FAf", // your program ID
    orgUnit: orgUnitId,
    enrollmentDate: new Date().toISOString().split('T')[0],
    incidentDate: new Date().toISOString().split('T')[0]
  };

  try {
    const res = await fetch("http://localhost:8081/api/enrollments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: AUTH
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    console.log("Enrollment response:", data);

    if (res.ok) {
      console.log("Enrollment successful:", data);
     
    } else {
      console.error("Enrollment failed:", data);
    }
  } 
  catch (error) {
    console.error("Error during enrollment:", error);
  } 
  loading = false;
  return loading;
}


// registrating a student as attended a test
export async function recordAttendance() {
// if (!trackedEntityInstanceId) return alert('Register a student first!');

const payload = {
  program: "dhQHvVG0FAf",
  orgUnit: "JrmBKF0gLkL",
  trackedEntityInstance: "j9P9ggylS3u",
  programStage: "pvQDWMhS6sU",
  occurredAt: new Date().toISOString(),
  eventDate: new Date().toISOString(),
  dataValues: [
    {
      dataElement: "NRXM4M9Bkas", // Example data element for attendance status
      value: "Yes" // Marking attendance as "Yes"
    },
    {
      dataElement: "zEwd7PwSHV9", // Example data element for event date
      value: new Date().toISOString() // ISO format for date and time
    }
  ]
};

try {
  const res = await fetch('http://localhost:8081/api/events', {
    method: 'POST',
    headers: {
      'Authorization': AUTH,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  const result = await res.json();
  console.log(result);
  document.getElementById('output').innerText = `Attendance recorded: ${JSON.stringify(result, null, 2)}`;
} catch (error) {
  console.error("Error recording attendance:", error);

}
}


// geting all tracked entities
export async function fetchTrackedEntities() {
const res = await fetch('http://localhost:8081/api/trackedEntities?program=dhQHvVG0FAf', {
  method: 'GET',
  headers: {
    'Authorization': AUTH,
    'Content-Type': 'application/json'
  }
});

const result = await res.json();
console.log(result);
}

// <---- ENDS HERE ---->


// { attribute: "ct4z0T1F36i", value: formData.get('school') },
// { attribute: "aqBmqM1onC7", value: formData.get('academicYear') },
// { attribute: "EHTfWCHTYCo", value: formData.get('yearOfStudy') },
// { attribute: "ADiCfoRxZI2", value: formData.get('programOfStudy') },
// { attribute: "ixauprApakv", value: formData.get('enrollmentDate') },
// { attribute: "ED1V1bFMtb1", value: formData.get('profilePictureInput') },
// { attribute: "nlAAn9uTTie", value: formData.get('firstName') },
// { attribute: "KHFDJkJgUvj", value: formData.get('surname') },
// { attribute: "Cg56JK84NAd", value: formData.get('gender') },
// { attribute: "EAPD9u4neIp", value: formData.get('dob') },
// { attribute: "hhyS9WANpuz", value: formData.get('Nationality') },
// { attribute: "pzZJIX2yMEZ", value: formData.get('guardian') },
// {attribute: "ofiRHvsg4Mt", value: formData.get('regNumber') },

// export function RegisterStudentComponent() {
//   const [loading, setLoading] = useState(false);

//   const handleRegisterStudent = async (form, orgId) => {
//     setLoading(true);
//     try {
//       await registerStudent(form, orgId);
//     } catch (error) {
//       console.error('Error registering student:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div>
//       {loading ? (
//         <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100px' }}>
//           <CircularProgress />
//         </div>
//       ) : (
//         <button onClick={() => handleRegisterStudent(/* pass form and orgId here */)}>
//           Register Student
//         </button>
//       )}
//     </div>
//   );
// }