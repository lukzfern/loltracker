import React, { useState, useEffect } from 'react';
import './home.css';
import SearchBar from '../SearchBar/SearchBar';
import RegionDropdown from '../Dropdown/RegionDropdown';
import { buscarUsuario } from '../../api/profileService';
import { getSummonerIcons } from '../../api/dataDragonService';
import { Grid, Box } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';

interface SummonerData {
  id: string;
  accountId: string;
  puuid: string;
  name: string;
  profileIconId: number;
  revisionDate: number;
  summonerLevel: number;
}

interface SummonerIcons {
  [key: number]: {
    image: {
      full: string;
    };
  };
}

interface RegionOption {
  value: string;
  label: string;
}

const Home: React.FC = () => {
  const [userData, setUserData] = useState<SummonerData | null>(null);
  const [selectedRegion, setSelectedRegion] = useState<string>('la2'); // Región por defecto
  const [summonerIcons, setSummonerIcons] = useState<SummonerIcons>({});
  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const regions: RegionOption[] = [
    { value: 'br1', label: 'BR' },
    { value: 'eun1', label: 'EUN' },
    { value: 'euw1 ', label: 'EUW' },
    { value: 'jp1', label: 'JP' },
    { value: 'kr', label: 'KR' },
    { value: 'la1', label: 'LAN' },
    { value: 'la2', label: 'LAS' },
    { value: 'na1', label: 'NA' },
    { value: 'oc1', label: 'OCE' },
    { value: 'ph2', label: 'PH' },
    { value: 'ru', label: 'RU' },
    { value: 'sg2', label: 'SG' },
    { value: 'th2 ', label: 'TH' },
    { value: 'tr1', label: 'TR' },
    { value: 'tw2', label: 'TW' },
    { value: 'vn2', label: 'VN' },
  ];

  const handleRegionChange = (event: SelectChangeEvent<string>) => {
    setSelectedRegion(event.target.value);
  };

  const handleSearch = async (searchTerm: string) => {
    try {
      setLoading(true);
      setUserData(null); // Reiniciar la información del usuario
      setSummonerIcons({}); // Reiniciar los iconos de invocador
      setLoaded(false); // Reiniciar la bandera de carga
      setError(null); // Reiniciar el mensaje de error
      setShowAnimation(false); // Reiniciar la animación
  
      const data: SummonerData = await buscarUsuario(searchTerm, selectedRegion);
      setUserData(data);
  
      const icons: SummonerIcons = await getSummonerIcons();
      setSummonerIcons(icons);
  
      setLoaded(true);
      setLoading(false);
      setShowAnimation(true); // Activar animación cuando se cargan los datos
    } catch (error) {
      console.error('Error al buscar el usuario:', error);
      setError('Usuario no encontrado');
      setLoading(false);
    }
  };
  

  useEffect(() => {
    setShowAnimation(false); // Desactivar animación al cambiar los datos del usuario
  }, [userData]);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const displaySummonerInfo = (): JSX.Element | null => {
    if (userData && summonerIcons && userData.profileIconId && summonerIcons[userData.profileIconId] && loaded) {
      const icon = summonerIcons[userData.profileIconId].image.full;
      const iconUrl = `https://ddragon.leagueoflegends.com/cdn/11.21.1/img/profileicon/${icon}`;

      return (
        <div className={`user-info-container ${imageLoaded ? 'fade-in' : ''}`}>
          <div className="summoner-info">
            <div className="summoner-name">{userData.name}</div>
            <div className="summoner-level-container">
              <img
                className={`summoner-icon ${imageLoaded ? 'image-loaded' : ''}`}
                src={iconUrl}
                alt="Summoner Icon"
                onLoad={handleImageLoad}
              />
              <div className="summoner-level">{userData.summonerLevel}</div>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className='Home'>
      <p>
        <b>✨ Welcome to loltracker 🔎</b>
      </p>
      <div className="center-content"> {/* Nuevo contenedor para centrar */}
        <SearchBar 
          onSearch={handleSearch} 
          onRegionChange={handleRegionChange} 
          regions={regions} 
          selectedRegion={selectedRegion}
        />
      </div>
      <div className="search-container">
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {(userData && summonerIcons && userData.profileIconId && summonerIcons[userData.profileIconId] && loaded) &&
        <div className="user-info-container">
          {displaySummonerInfo()}
        </div>}
      </div>
    </div>
  );
};

export default Home;
