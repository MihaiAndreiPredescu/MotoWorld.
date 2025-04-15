import "./VehicleCard.css";

import React, { useState } from "react";

const VehicleCard = ({ vehicle, isFastest, isSlowest, onDelete, onEdit }) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editedVehicle, setEditedVehicle] = useState({ ...vehicle });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedVehicle({
      ...editedVehicle,
      [name]: name === "topSpeed" || name === "horsepower" ? value.replace(/\D/, "") : value,
    });
  };

  return (
    <div className={`vehicle-card ${isFastest ? "fastest" : ""} ${isSlowest ? "slowest" : ""}`}>
      <img src={vehicle.image} alt={vehicle.name} />
      <div className="vehicle-details">
        <h2>{vehicle.brand} {vehicle.name}</h2>
        <p>Type: {vehicle.type}</p>
        <p>Top Speed: {vehicle.topSpeed} km/h</p>
        <p>Horsepower: {vehicle.horsepower} hp</p>
        <p>{vehicle.description}</p>
        <div className="actions">
          <button className="edit-btn" onClick={() => setShowEditForm(true)}>Edit</button>
          <button className="delete-btn" onClick={() => setShowDeleteConfirm(true)}>Delete</button>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="modal">
          <p>Are you sure you want to delete this bike?</p>
          <button onClick={() => { onDelete(vehicle.id); setShowDeleteConfirm(false); }}>Yes</button>
          <button onClick={() => setShowDeleteConfirm(false)}>No</button>
        </div>
      )}

      {/* Edit Form Modal */}
      {showEditForm && (
        <div className="modal">
          <h3>Edit {vehicle.name}</h3>
          <label>Brand:</label>
          <input type="text" name="brand" value={editedVehicle.brand} onChange={handleInputChange} />
          
          <label>Name:</label>
          <input type="text" name="name" value={editedVehicle.name} onChange={handleInputChange} />
          
          <label>Type:</label>
          <input type="text" name="type" value={editedVehicle.type} onChange={handleInputChange} />

          <label>Top Speed (km/h):</label>
          <input type="text" name="topSpeed" value={editedVehicle.topSpeed} onChange={handleInputChange} />

          <label>Horsepower (hp):</label>
          <input type="text" name="horsepower" value={editedVehicle.horsepower} onChange={handleInputChange} />

          <label>Description:</label>
          <textarea name="description" value={editedVehicle.description} onChange={handleInputChange}></textarea>

          <button onClick={() => { onEdit(editedVehicle); setShowEditForm(false); }}>Confirm Changes</button>
          <button onClick={() => setShowEditForm(false)}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default VehicleCard;
