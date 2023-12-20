import React, { useState } from 'react';
import { TextField, Button, Select, MenuItem, SelectChangeEvent } from '@mui/material';

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

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      onSearch(searchTerm);
    }
  };

  const inputStyle: React.CSSProperties = {
    width: '180px',
    display: 'flex',
    alignItems: 'center', 
  };
  

  const buttonStyle: React.CSSProperties = {
    backgroundColor: '#ffffff',
    color: '#666666',
    border: 'none',
    borderRadius: '20px',
    padding: '10px 20px',
    cursor: 'pointer',
    marginLeft: '5px',
    borderRight: '1px solid #ccc',
  borderLeft: '1px solid #ccc',
  height: 'calc(100% - 20px)', // Ajusta la altura del input
  margin: '0 8px', // Margen para centrar la línea en el contenedor
  };

  const selectStyle: React.CSSProperties = {
    backgroundColor: '#ffffff',
    color: '#666666',
    border: 'none',
    borderRadius: '20px',
    padding: '6px 10px',
    marginRight: '5px',
    outline: 'none',
    borderRight: '1px solid #ccc',
    borderLeft: '1px solid #ccc',
    height: 'calc(100% - 12px)', // Ajusta la altura del select
    margin: '0 8px', // Margen para centrar la línea en el contenedor
  };
  
  const handleFocus = (event: React.FocusEvent<HTMLElement>) => {
    const target = event.target as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
    target.blur();
  };

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    border: '1px solid #cccccc',
    backgroundColor: 'white',
    borderRadius: '20px',
    height: '40px', // Ajusta la altura del contenedor
  };

  return (
    <div style={containerStyle}>
      <Select
        value={selectedRegion}
        onChange={onRegionChange}
        onFocus={handleFocus}
        style={selectStyle}
        sx={{ 
          boxShadow: 'none', 
          '.MuiOutlinedInput-notchedOutline': 
            { border: 0 }, 
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            border: "none",
            borderRadius: "5px 5px 0 0"
          },
          '& .MuiList-root .MuiMenuItem-root:not(:last-child)': {
            borderBottom: '1px solid #ccc', // Añadir borde inferior a todos los elementos excepto al último
          },
          borderRight: '1px solid #ccc',
          borderLeft: '1px solid #ccc',
          height: 'calc(100% - 12px)', // Ajusta la altura del select
          margin: '0 8px', // Margen para centrar la línea en el contenedor
          '&:focus': {
            outline: 'none', // Quitar outline al enfocar
          },
          '& option': {
            color: '#666666', // Color del texto de las opciones
          },
          '& .MuiSelect-icon': {
            color: '#666666', // Color del icono del select
          },
          '& .MuiSelect-select': {
            color: '#666666', // Color del texto seleccionado
            fontFamily: 'Roboto, sans-serif', // Tipo de fuente
            fontSize: '14px', // Tamaño de fuente
            fontWeight: 'bold', // Texto en negrita
          },
          width: '100px',
        }}
      >
        {regions.map((region) => (
          <MenuItem
            key={region.value}
            value={region.value}
            sx={{
              color: '#666666', // Color del texto del MenuItem
              fontFamily: 'Arial, sans-serif', // Tipo de fuente
              fontSize: '14px', // Tamaño de fuente
              fontWeight: 'bold', // Texto en negrita
            }}
          >
            {region.label}
          </MenuItem>
        ))}
      </Select>
      <TextField
        placeholder="Search summoner..."
        value={searchTerm}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
        onKeyDown={handleKeyDown}
        style={inputStyle}
        sx={{
          "& fieldset": { border: 'none' },
          '&::placeholder': {
            color: 'rgba(102, 102, 102, 0.6)',
            fontWeight: 'normal',
          },
          '& input': {
            color: '#666666',
            fontFamily: 'Arial, sans-serif',
            fontSize: '14px',
            fontWeight: 'bold',
          },
        }}
        InputProps={{ style: { borderRadius: '20px', border: 'none' } }} // Eliminar borde
      />
      <Button 
        variant="outlined" 
        style={buttonStyle} 
        onClick={handleSearch}
        sx={{
          color: '#666666',
          fontFamily: 'Roboto, sans-serif',
          fontSize: '14px',
          fontWeight: 'bold',
        }}
      >
        Go!
      </Button>
    </div>
  );
};

export default SearchBar;