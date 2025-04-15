import { render, screen, fireEvent } from "@testing-library/react";
import HomePage from "./pages/HomePage";
import VehiclesPage from "./pages/VehiclesPage";
import { BrowserRouter } from "react-router";
import AddVehiclePage from "./pages/AddVehiclePage";
import VehicleForm from "./components/VehicleForm";
import VehicleList from "./components/VehicleList";

test("adds a new bike", () => {
  renderWithRouter(<VehiclesPage />);

  const addButton = screen.getByText("Add");
  fireEvent.click(addButton);

  const nameInput = screen.getByPlaceholderText("Name");
  const brandInput = screen.getByPlaceholderText("Brand");
  const typeInput = screen.getByPlaceholderText("Type");
  const topSpeedInput = screen.getByPlaceholderText("Top Speed (km/h)");
  const horsepowerInput = screen.getByPlaceholderText("Horsepower (hp)");
  const descriptionInput = screen.getByPlaceholderText("Description");

  fireEvent.change(nameInput, { target: { value: "Test Bike" } });
  fireEvent.change(brandInput, { target: { value: "Test Brand" } });
  fireEvent.change(typeInput, { target: { value: "Sport" } });
  fireEvent.change(topSpeedInput, { target: { value: "220" } });
  fireEvent.change(horsepowerInput, { target: { value: "150" } });
  fireEvent.change(descriptionInput, { target: { value: "A fast test bike." } });

  const submitButton = screen.getByText("Confirm Changes");
  fireEvent.click(submitButton);

  expect(screen.getByText("Test Bike")).toBeInTheDocument();
});

test("deletes a bike", () => {
  renderWithRouter(<HomePage />);

  const deleteButton = screen.getAllByText("Delete")[0];
  fireEvent.click(deleteButton);

  expect(screen.getByText("Are you sure you want to delete this bike?")).toBeInTheDocument();

  const confirmDelete = screen.getByText("Yes");
  fireEvent.click(confirmDelete);

  expect(deleteButton).not.toBeInTheDocument();
});

test("edits a bike", () => {
  renderWithRouter(<HomePage />);

  const editButton = screen.getAllByText("Edit")[0];
  fireEvent.click(editButton);

  const nameInput = screen.getByPlaceholderText("Name");
  fireEvent.change(nameInput, { target: { value: "Edited Bike" } });

  const confirmButton = screen.getByText("Confirm Changes");
  fireEvent.click(confirmButton);

  expect(screen.getByText("Edited Bike")).toBeInTheDocument();
});

test("filters bikes by name", () => {
  renderWithRouter(<HomePage />);

  const searchInput = screen.getByPlaceholderText("Search for a bike...");
  fireEvent.change(searchInput, { target: { value: "Ninja" } });

  expect(screen.getByText(/Ninja/i)).toBeInTheDocument();
});
