import React from 'react';
import { Select, MenuItem, SelectChangeEvent } from '@mui/material';

interface RegionOption {
  value: string;
  label: string;
}

interface RegionDropdownProps {
  regions: RegionOption[];
  selectedRegion: string;
  onChange: (event: SelectChangeEvent<string>) => void; // Corregir el tipo del evento aquí
}

const RegionDropdown: React.FC<RegionDropdownProps> = ({ regions, selectedRegion, onChange }) => {
  return (
    <Select value={selectedRegion} onChange={onChange} sx={{ height: '40px', backgroundColor: 'white',  }}>
      {regions.map((region) => (
        <MenuItem key={region.value} value={region.value}>
          {region.label}
        </MenuItem>
      ))}
    </Select>
  );
};

export default RegionDropdown;
