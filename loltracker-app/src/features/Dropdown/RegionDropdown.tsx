import React from 'react';

interface RegionOption {
  value: string;
  label: string;
}

interface RegionDropdownProps {
  regions: RegionOption[];
  selectedRegion: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const RegionDropdown: React.FC<RegionDropdownProps> = ({ regions, selectedRegion, onChange }) => {
  return (
    <select value={selectedRegion} onChange={onChange}>
      {regions.map((region) => (
        <option key={region.value} value={region.value}>
          {region.label}
        </option>
      ))}
    </select>
  );
};

export default RegionDropdown;
