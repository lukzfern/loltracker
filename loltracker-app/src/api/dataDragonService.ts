import axios, { AxiosResponse } from 'axios';

interface SummonerIcons {
  [key: number]: {
    image: {
      full: string;
    };
  };
}

export const getSummonerIcons = async (): Promise<SummonerIcons> => {
  const version = '13.24.1'; // Adjust this version based on the current League of Legends patch
  const url = `https://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/profileicon.json`;

  try {
    const response: AxiosResponse<any> = await axios.get(url);
    return response.data.data;
  } catch (error) {
    throw new Error('Error fetching summoner icons');
  }
};

export default getSummonerIcons;
