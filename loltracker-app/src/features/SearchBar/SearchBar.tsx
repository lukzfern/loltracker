import React, { useState } from 'react';
import { TextField, Button, Select, MenuItem, SelectChangeEvent, Typography, InputAdornment } from '@mui/material';

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
  regions: RegionOption[];
  selectedRegion: string;
  onRegionChange: (event: SelectChangeEvent<string>) => void;
}

interface RegionOption {
  value: string;
  label: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, regions, selectedRegion, onRegionChange }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isLabelVisible, setIsLabelVisible] = useState(true);

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      onSearch(searchTerm);
    }
  };

  const handleFocus = (event: React.FocusEvent<HTMLElement>) => {
    const target = event.target as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
    target.blur();
  };

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      border: '1px solid #cccccc',
      backgroundColor: 'white',
      borderRadius: '20px',
      height: '40px', // Ajusta la altura del contenedor
    }}>
      <Select
        value={selectedRegion}
        onChange={onRegionChange}
        onFocus={handleFocus}
        style={{
          backgroundColor: '#ffffff',
          color: '#666666',
          border: 'none',
          padding: '6px 10px',
          outline: 'none',
          borderRight: '0.5px solid #ccc',
          height: 'calc(100% - 20px)',
          margin: '0 8px',
          borderRadius: '0',
        }}
        sx={{
          boxShadow: 'none',
          '.MuiOutlinedInput-notchedOutline': {
            border: 0,
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            border: "none",
            borderRadius: "5px 5px 0 0",
          },
          '& .MuiList-root .MuiMenuItem-root:not(:last-child)': {
            borderBottom: '1px solid #ccc',
          },
          '&:focus': {
            outline: 'none',
          },
          '& option': {
            color: '#666666',
          },
          '& .MuiSelect-icon': {
            color: '#666666',
          },
          '& .MuiSelect-select': {
            color: '#666666',
            fontFamily: 'Roboto, sans-serif',
            fontSize: '14px',
            fontWeight: 'bold',
          },
          width: '100px',
        }}
      >
        {regions.map((region) => (
          <MenuItem
            key={region.value}
            value={region.value}
            sx={{
              color: '#666666',
              fontFamily: 'Arial, sans-serif',
              fontSize: '14px',
              fontWeight: 'bold',
            }}
          >
            {region.label}
          </MenuItem>
        ))}
      </Select>
      <div style={{ position: 'relative', display: 'inline-block' }}>
        <TextField
          placeholder="Game Name +"
          InputProps={{
            style: { borderRadius: '20px', border: 'none' }}}
          value={searchTerm}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setSearchTerm(e.target.value)
            if (e.target.value.trim() !== '') {
              setIsLabelVisible(false);
            } else {
              setIsLabelVisible(true);
            }
          }}
          onKeyDown={handleKeyDown}
          style={{
            width: '180px',
            display: 'flex',
            alignItems: 'center',
          }}
          sx={{
            "& fieldset": { border: 'none' },
            '&::placeholder': {
              color: 'rgba(102, 102, 102, 0.6)',
              fontWeight: 'normal',
            },
            '& input': {
              color: 'black',
              fontFamily: 'Arial, sans-serif',
              fontSize: '14px',
            },
          }}
        />
         {isLabelVisible && (
        <label
          style={{
            position: 'absolute',
            right: '25px',
            top: '50%',
            transform: 'translateY(-50%)',
            fontWeight: 'bold',
            backgroundColor: '#444',
            padding: '1px 5px',
            border: '1px solid #666666',
            borderRadius: '3px',
            fontSize: '14px',
            pointerEvents: 'none', // Bloquea eventos del mouse
            userSelect: 'none', // Evita la selección de texto
          }}
        >
          #{regions.find(region => region.value === selectedRegion)?.label}
        </label>)}
      </div>
      <Button
        variant="outlined"
        style={{
          backgroundColor: '#ffffff',
          color: '#666666',
          border: 'none',
          padding: '10px 20px',
          cursor: 'pointer',
          borderLeft: '0.5px solid #ccc',
          height: 'calc(100% - 20px)',
          margin: '0 8px',
        }}
        onClick={handleSearch}
        sx={{
          color: '#666666',
          fontFamily: 'Roboto, sans-serif',
          fontSize: '14px',
          fontWeight: 'bold',
          borderRadius: '0',
        }}
      >
        Go!
      </Button>
    </div>
  );
};

export default SearchBar;