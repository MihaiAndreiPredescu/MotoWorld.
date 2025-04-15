import React from "react";
import { Bar, Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from "chart.js";

// ✅ Register required scales & elements
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const BikeStatistics = ({ bikes }) => {
  // 1. Bike Type Distribution Data
  const typeData = {
    labels: [...new Set(bikes.map(bike => bike.type))], // Unique bike types
    datasets: [
      {
        data: [...new Set(bikes.map(bike => bike.type))].map(
          type => bikes.filter(bike => bike.type === type).length
        ),
        backgroundColor: [
          "#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0",
          "#9966FF", "#FF9F40", "#8AC24A", "#F06292"
        ],
      },
    ],
  };

  // 2. Top Speed Distribution Data
  const speedData = {
    labels: ["<100 km/h", "100-200 km/h", "200-300 km/h", "300+ km/h"],
    datasets: [
      {
        label: "Bikes by Top Speed",
        backgroundColor: "#36A2EB",
        data: [
          bikes.filter(b => parseInt(b.topSpeed) < 100).length,
          bikes.filter(b => parseInt(b.topSpeed) >= 100 && parseInt(b.topSpeed) < 200).length,
          bikes.filter(b => parseInt(b.topSpeed) >= 200 && parseInt(b.topSpeed) < 300).length,
          bikes.filter(b => parseInt(b.topSpeed) >= 300).length,
        ],
      },
    ],
  };

  // 3. Brand Popularity Data
  const brandData = {
    labels: [...new Set(bikes.map(bike => bike.brand))], // Unique brands
    datasets: [
      {
        label: "Bikes by Brand",
        backgroundColor: "#FF9F40",
        data: [...new Set(bikes.map(bike => bike.brand))].map(
          brand => bikes.filter(bike => bike.brand === brand).length
        ),
      },
    ],
  };

  // Chart styling options
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          boxWidth: 12,
          font: { size: 10 },
        },
      },
      title: {
        display: true,
        font: { size: 12 },
        padding: { top: 10, bottom: 10 },
      },
    },
    scales: {
      x: { ticks: { font: { size: 10 } } },
      y: { ticks: { font: { size: 10 } } },
    },
  };

  return (
    <div className="statistics-section">
      <h3>Motorcycle Statistics</h3>
      <div className="charts-container">
        <div className="chart-wrapper">
          <Doughnut
            data={typeData}
            options={{
              ...chartOptions,
              plugins: { ...chartOptions.plugins, title: { ...chartOptions.plugins.title, text: "Bike Type Distribution" } },
            }}
          />
        </div>
        <div className="chart-wrapper">
          <Bar
            data={speedData}
            options={{
              ...chartOptions,
              indexAxis: "x",
              plugins: { ...chartOptions.plugins, title: { ...chartOptions.plugins.title, text: "Top Speed Distribution" } },
            }}
          />
        </div>
        <div className="chart-wrapper">
          <Bar
            data={brandData}
            options={{
              ...chartOptions,
              indexAxis: "y",
              plugins: { ...chartOptions.plugins, title: { ...chartOptions.plugins.title, text: "Brand Popularity" } },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default BikeStatistics;
