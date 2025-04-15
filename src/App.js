import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import VehiclesPage from "./pages/VehiclesPage";
import AddVehiclePage from "./pages/AddVehiclePage";
import StatusBar from "./components/StatusBar";

function App() {
  return (
    <Router>
      <StatusBar />
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/vehicles" element={<VehiclesPage />} />
        <Route path="/add-vehicle" element={<AddVehiclePage />} />
      </Routes>
    </Router>
  );
}

export default App;
