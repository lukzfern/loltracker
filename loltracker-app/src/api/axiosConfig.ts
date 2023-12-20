import axios, { AxiosInstance } from 'axios';

const instance: AxiosInstance = axios.create({
    baseURL: 'https://la2.api.riotgames.com/',
    headers: {
      'Content-Type': "application/json",
      'X-Riot-Token': "RGAPI-42187f04-76e1-45a8-971a-948ce7987d8e"
    }
  });
  
  export default instance;