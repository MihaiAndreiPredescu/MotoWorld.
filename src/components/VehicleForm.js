import { useState } from "react";
import { useNavigate } from "react-router";
import { addBike } from "../api";

const VehicleForm = () => {
  const [brand, setBrand] = useState("");
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [topSpeed, setTopSpeed] = useState("");
  const [horsepower, setHorsepower] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!/^\d+$/.test(topSpeed) || !/^\d+$/.test(horsepower)) {
      alert("Top speed and horsepower must be numeric values.");
      return;
    }

    try {
      setSubmitting(true);
      await addBike({
        brand,
        name,
        type,
        topSpeed,
        horsepower,
        description,
        image
      });
      navigate("/vehicles");
    } catch (error) {
      console.error("Error adding bike:", error);
      setSubmitting(false);
      alert("Failed to add motorcycle. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <input 
        type="text" 
        placeholder="Brand" 
        value={brand} 
        onChange={(e) => setBrand(e.target.value)} 
        required 
      />
      <input 
        type="text" 
        placeholder="Name" 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
        required 
      />
      <input 
        type="text" 
        placeholder="Type" 
        value={type} 
        onChange={(e) => setType(e.target.value)} 
        required 
      />
      <input 
        type="text" 
        placeholder="Top Speed (km/h)" 
        value={topSpeed} 
        onChange={(e) => setTopSpeed(e.target.value)} 
        required 
      />
      <input 
        type="text" 
        placeholder="Horsepower (hp)" 
        value={horsepower} 
        onChange={(e) => setHorsepower(e.target.value)} 
        required 
      />
      <textarea 
        placeholder="Description" 
        value={description} 
        onChange={(e) => setDescription(e.target.value)} 
        required 
      />
      <input 
        type="url" 
        placeholder="Image URL" 
        value={image} 
        onChange={(e) => setImage(e.target.value)} 
      />
      <button type="submit" disabled={submitting}>
        {submitting ? "Adding..." : "Add Motorcycle"}
      </button>
    </form>
  );
};

const styles = {
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    width: "300px",
    margin: "auto",
  },
};

export default VehicleForm;