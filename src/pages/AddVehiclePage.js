import VehicleForm from "../components/VehicleForm";

const AddVehiclePage = () => {
  return (
    <div style={styles.container}>
      <h1>Add a New Motorcycle</h1>
      <VehicleForm />
    </div>
  );
};

const styles = {
  container: { 
    padding: "20px", 
    textAlign: "center",
  },
};
export default AddVehiclePage;
