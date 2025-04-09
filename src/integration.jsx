import axios from 'axios';

// Setup axios instance for DHIS2
const dhis2 = axios.create({
  baseURL: 'http://localhost:8081/api',
  auth: {
    username: 'admin',
    password: 'district'
  },
  headers: {
    'Content-Type': 'application/json'
  }
});

// 1. Save an organization unit
export const createOrgUnit = async (orgUnitData) => {
  try {
    const response = await dhis2.post('/organisationUnits', orgUnitData);
    return response.data;
  } catch (error) {
    console.error('Error creating organisation unit:', error.response?.data || error.message);
    throw error;
  }
};

// 2. Get all organization units
export const getOrgUnits = async () => {
  try {
    const response = await dhis2.get('/organisationUnits.json?paging=false&fields=id,name,parent[id,name]');
    console.log(response.data.organisationUnits)
    return response.data.organisationUnits;
  } catch (error) {
    console.error('Error fetching organisation units:', error.response?.data || error.message);
    throw error;
  }
};

// 3. Register a student to a tracker program
export const registerStudent = async (studentData) => {
  try {
    const response = await dhis2.post('/trackedEntityInstances', studentData);
    return response.data;
  } catch (error) {
    console.error('Error registering student:', error.response?.data || error.message);
    throw error;
  }
};

// 4. Get registered entities from a program
export const getEntities = async () => {
  // const programID =getPrograms()
  // const orgUnitID = getOrgUnits()
  try {
    const response = await dhis2.get(`/trackedEntityInstances.json`, {
      params: {
        program: "qxZBosiOpz0",
        ou: "kvXAhslMWmf",
        ouMode: 'ACCESSIBLE',  
        paging: false
      }
    });
    console.log(response.data.trackedEntityInstances)
    return response.data.trackedEntityInstances;
  } catch (error) {
    console.error('Error fetching tracked entities:', error.response?.data || error.message);
    throw error;
  }
};

// 5. Create a tracker program
export const createTrackerProgram = async (programData) => {
  try {
    const response = await dhis2.post('/programs', programData);
    return response.data;
  } catch (error) {
    console.error('Error creating tracker program:', error.response?.data || error.message);
    throw error;
  }
};

// 6. Get all registered programs
export const getPrograms = async () => {
  try {
    const response = await dhis2.get('/programs.json?paging=false&fields=id,name,programType');
    console.log(response.data.programs)
    return response.data.programs;
  } catch (error) {
    console.error('Error fetching programs:', error.response?.data || error.message);
    throw error;
  }
};
