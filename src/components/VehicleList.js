import { useState, useEffect, useCallback } from 'react';
import { useInView } from 'react-intersection-observer';
import VehicleCard from './VehicleCard';
import SearchFilter from './SearchFilter';
import { getBikes, deleteBike, updateBike, searchBikes } from '../api';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8081/api/bikes';

const VehicleList = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const [ref, inView] = useInView();

  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return;
    
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}?page=${page}&size=10`);
      const newBikes = await response.json();
      
      if (newBikes.length === 0) {
        setHasMore(false);
      } else {
        setVehicles(prev => [...prev, ...newBikes]);
        setPage(prev => prev + 1);
      }
    } finally {
      setLoading(false);
    }
  }, [page, loading, hasMore]);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        let data;
        if (searchQuery) {
          data = await searchBikes(searchQuery);
        } else {
          data = await getBikes();
        }
        setVehicles(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching bikes:", error);
        setLoading(false);
      }
    };
    
    fetchInitialData();
  }, [searchQuery]);

  useEffect(() => {
    if (inView) loadMore();
  }, [inView, loadMore]);

  useEffect(() => {
    if (filterType && filterValue) {
      const filtered = vehicles.filter(vehicle => 
        vehicle[filterType].toLowerCase() === filterValue.toLowerCase()
      );
      setVehicles(filtered);
    }
  }, [filterType, filterValue, vehicles]);

  const highestSpeed = Math.max(...vehicles.map(vehicle => vehicle.topSpeed), 0);
  const slowestSpeed = Math.min(...vehicles.map(vehicle => vehicle.topSpeed), Infinity);

  const handleDelete = async (id) => {
    try {
      await deleteBike(id);
      setVehicles(vehicles.filter(vehicle => vehicle.id !== id));
    } catch (error) {
      console.error("Error deleting bike:", error);
    }
  };

  const handleEdit = async (updatedVehicle) => {
    try {
      const updated = await updateBike(updatedVehicle.id, updatedVehicle);
      setVehicles(vehicles.map(vehicle =>
        vehicle.id === updated.id ? updated : vehicle
      ));
    } catch (error) {
      console.error("Error updating bike:", error);
    }
  };

  if (loading && page === 1) {
    return <div>Loading initial data...</div>;
  }

  return (
    <div>
      <SearchFilter 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        filterType={filterType}
        setFilterType={setFilterType}
        filterValue={filterValue}
        setFilterValue={setFilterValue}
        vehicles={vehicles}
      />
      <div style={styles.bikeGrid}>
        {vehicles.map(vehicle => (
          <VehicleCard 
            key={vehicle.id}
            vehicle={vehicle}
            isFastest={vehicle.topSpeed === highestSpeed}
            isSlowest={vehicle.topSpeed === slowestSpeed}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        ))}
      </div>
      <div ref={ref} style={{ height: '20px' }}>
        {loading && <div>Loading more bikes...</div>}
      </div>
    </div>
  );
};

const styles = {
  bikeGrid: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center", 
    gap: "20px", 
    marginTop: "20px",
    alignItems: "stretch", 
  },
};

export default VehicleList;