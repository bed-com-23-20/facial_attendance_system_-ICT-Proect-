
import React, { useEffect, useState } from 'react';
import { getOrgUnits } from '../integration'; // Adjust path as needed
import { Select, MenuItem, InputLabel, FormControl, Typography, Container } from '@mui/material';

const OrgUnitSelect = ({ value, onChange }) => {
  const [orgUnits, setOrgUnits] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrgUnits = async () => {
      try {
        const units = await getOrgUnits();
        setOrgUnits(units?.organisationUnits || []);
      } catch (error) {
        console.error('Failed to fetch organisation units:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrgUnits();
  }, []);

  return (
    <Container maxWidth="sm">
      {loading ? (
        <Typography>Loading...</Typography>
      ) : (
        <FormControl fullWidth variant="outlined" margin="normal">
          {/* <InputLabel>Organisation Unit</InputLabel> */}
          <Select
            label="Organisation Unit"
            value={value || ''}
            onChange={onChange}
            displayEmpty
          >
            <MenuItem value="" disabled>Select an Organisation Unit</MenuItem>
            {orgUnits.map((unit) => (
              <MenuItem key={unit.id} value={unit.name}>
                {unit.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
    </Container>
  );
};

export default OrgUnitSelect;
