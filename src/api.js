import { checkNetworkStatus } from './services/NetworkService';
import { addToQueue } from './services/OfflineQueues';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8081/api/bikes';

export const getBikes = async (page = 1, size = 10) => {
  try {
    const response = await fetch(`${API_BASE_URL}?page=${page}&size=${size}`);
    if (!response.ok) throw new Error('Failed to fetch bikes');
    return await response.json();
  } catch (error) {
    console.error('Error fetching bikes:', error);
    throw error;
  }
};

export const getBikeById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`);
    if (!response.ok) throw new Error('Failed to fetch bike');
    return await response.json();
  } catch (error) {
    console.error('Error fetching bike:', error);
    throw error;
  }
};

export const addBike = async (bike) => {
  try {
    const { networkDown, serverDown } = await checkNetworkStatus();
    
    if (networkDown || serverDown) {
      addToQueue({
        url: API_BASE_URL,
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bike)
      });
      throw new Error('Offline - operation queued');
    }

    const response = await fetch(API_BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        brand: bike.brand,
        name: bike.name,
        type: bike.type,
        topSpeed: parseInt(bike.topSpeed),
        horsepower: parseInt(bike.horsepower),
        description: bike.description,
        image: bike.image
      }),
    });
    if (!response.ok) throw new Error('Failed to add bike');
    return await response.json();
  } catch (error) {
    console.error('Error adding bike:', error);
    throw error;
  }
};

export const updateBike = async (id, bike) => {
  try {
    const { networkDown, serverDown } = await checkNetworkStatus();
    
    if (networkDown || serverDown) {
      addToQueue({
        url: `${API_BASE_URL}/${id}`,
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bike)
      });
      throw new Error('Offline - operation queued');
    }

    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        brand: bike.brand,
        name: bike.name,
        type: bike.type,
        topSpeed: parseInt(bike.topSpeed),
        horsepower: parseInt(bike.horsepower),
        description: bike.description,
        image: bike.image
      }),
    });
    if (!response.ok) throw new Error('Failed to update bike');
    return await response.json();
  } catch (error) {
    console.error('Error updating bike:', error);
    throw error;
  }
};

export const deleteBike = async (id) => {
  try {
    const { networkDown, serverDown } = await checkNetworkStatus();
    
    if (networkDown || serverDown) {
      addToQueue({
        url: `${API_BASE_URL}/${id}`,
        method: 'DELETE'
      });
      throw new Error('Offline - operation queued');
    }

    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete bike');
    return true;
  } catch (error) {
    console.error('Error deleting bike:', error);
    throw error;
  }
};

export const searchBikes = async (query) => {
  try {
    const response = await fetch(`${API_BASE_URL}/search?query=${encodeURIComponent(query)}`);
    if (!response.ok) throw new Error('Failed to search bikes');
    return await response.json();
  } catch (error) {
    console.error('Error searching bikes:', error);
    throw error;
  }
};