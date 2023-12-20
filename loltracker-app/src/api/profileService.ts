// profileService.ts

import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000',
});

export const buscarUsuario = async (nombreUsuario: string, region: string) => {
  try {
    const response = await axiosInstance.get(`/api/summoner/${encodeURIComponent(nombreUsuario)}`, {
      params: { region }, // Agregar la región como parámetro
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
