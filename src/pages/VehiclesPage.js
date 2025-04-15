import { useNavigate } from "react-router";
import VehicleList from "../components/VehicleList";

const VehiclesPage = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <h1>Motorcycle Collection</h1>
      <button style={styles.addButton} onClick={() => navigate("/add-vehicle")}>
        Add Motorcycle to Collection
      </button>
      <VehicleList />
    </div>
  );
};

const styles = {
  addButton: {
    display: "block",
    width: "250px",
    margin: "20px auto",
    padding: "10px",
    fontSize: "18px",
    background: "red",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  container: { 
    padding: "20px", 
    textAlign: "center" },
};

export default VehiclesPage;
