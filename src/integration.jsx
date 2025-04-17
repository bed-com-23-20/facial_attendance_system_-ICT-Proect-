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
    const response = await dhis2.get('/organisationUnits.json?paging=false&fields=id,name');
     
    return response.data;
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

// 7. Get all data elements

// 8. Get all tracked entity types
export const getTrackedEntityTypes = async () => {
  try {
    const response = await dhis2.get('/trackedEntityTypes.json?paging=false&fields=id,name');
    return response.data.trackedEntityTypes;
  } catch (error) {
    console.error('Error fetching tracked entity types:', error.response?.data || error.message);
    throw error;
  }
};

// 9. Get all tracked entity attributes
export const getTrackedEntityAttributes = async () => {
  try {
    const response = await dhis2.get('/trackedEntityAttributes.json?paging=false&fields=id,name');
    return response.data.trackedEntityAttributes;
  } catch (error) {
    console.error('Error fetching tracked entity attributes:', error.response?.data || error.message);
    throw error;
  }
};

// Fetch trackedEntityTypeId by name (e.g., "student")
export const fetchTrackedEntityTypeId = async (typeName) => {
  try {
    const response = await axios.get('/trackedEntityTypes.json?fields=id,displayName');
    const trackedTypes = response.data.trackedEntityTypes;
    const type = trackedTypes.find(t => t.displayName.toLowerCase().includes(typeName.toLowerCase()));
    return type ? type.id : null;
  } catch (error) {
    console.error('Error fetching tracked entity type ID:', error);
    throw error;
  }
};

// Fetch all attributes for a specific trackedEntityType ID
export const fetchTrackedEntityAttributes = async (trackedEntityTypeId) => {
  try {
    const response = await axios.get(`/trackedEntityTypes/${trackedEntityTypeId}.json?fields=trackedEntityTypeAttributes[trackedEntityAttribute[id,displayName,valueType,mandatory]]`);
    console.log(response.data.trackedEntityTypeAttributes)
    return response.data.trackedEntityTypeAttributes.map(attr => attr.trackedEntityAttribute);
  } catch (error) {
    console.error('Error fetching tracked entity attributes:', error);
    throw error;
  }
};
