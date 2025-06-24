import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Pie, Bar, Line } from 'react-chartjs-2';

// Register components
ChartJS.register(
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

export default function VehicleDashboard() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('https://proccms-backend.onrender.com/api/vehicles')
      .then(res => setData(res.data))
      .catch(err => console.error('Vehicle fetch error:', err));
  }, []);

  // --- Pie: Department Distribution ---
  const deptCounts = data.reduce((acc, item) => {
    const dept = item.classOrDept || 'Unknown';
    acc[dept] = (acc[dept] || 0) + 1;
    return acc;
  }, {});
  const pieData = {
    labels: Object.keys(deptCounts),
    datasets: [{
      data: Object.values(deptCounts),
      backgroundColor: ['#33cccc', '#00ffff', '#0099cc', '#66ffff', '#003c3c'],
      hoverOffset: 10,
    }]
  };

  // --- Bar: Vehicle Type Count ---
  const typeCounts = data.reduce((acc, item) => {
    const type = item.vehicleType || 'Unknown';
    acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, {});
  const barData = {
    labels: Object.keys(typeCounts),
    datasets: [{
      label: 'Vehicle Types',
      data: Object.values(typeCounts),
      backgroundColor: '#00ccff',
      borderColor: '#0099cc',
      borderWidth: 1,
    }]
  };

  // --- Line: Pass Issued Over Time ---
  const passByMonth = {};
  data.forEach(item => {
    const date = new Date(item.date);
    if (!isNaN(date)) {
      const key = `${date.getMonth() + 1}-${date.getFullYear()}`;
      passByMonth[key] = (passByMonth[key] || 0) + 1;
    }
  });
  const sortedDates = Object.keys(passByMonth).sort((a, b) => {
    const [mA, yA] = a.split('-').map(Number);
    const [mB, yB] = b.split('-').map(Number);
    return yA === yB ? mA - mB : yA - yB;
  });
  const lineData = {
    labels: sortedDates,
    datasets: [{
      label: 'Passes Over Time',
      data: sortedDates.map(k => passByMonth[k]),
      fill: false,
      backgroundColor: '#00ffff',
      borderColor: '#00cccc',
      tension: 0.4,
    }]
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Vehicle Pass Analytics Dashboard</h2>

      <div style={styles.chartGrid}>
        <div style={styles.chartCard}>
          <h4>Department Distribution</h4>
          <Pie data={pieData} />
        </div>

        <div style={styles.chartCard}>
          <h4>Vehicle Type Count</h4>
          <Bar
            data={barData}
            options={{
              responsive: true,
              plugins: { legend: { display: false } },
              scales: { y: { beginAtZero: true, precision: 0 } }
            }}
          />
        </div>

        <div style={styles.chartCard}>
          <h4>Passes Over Time</h4>
          <Line
            data={lineData}
            options={{
              responsive: true,
              plugins: { legend: { position: 'top' } },
              scales: { y: { beginAtZero: true, precision: 0 } }
            }}
          />
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: '20px',
    minHeight: '100vh',
    background: 'linear-gradient(to bottom, #001f1f, #000)',
    color: '#00ffff',
    fontFamily: 'Segoe UI, sans-serif',
  },
  title: {
    textAlign: 'center',
    fontSize: '2rem',
    marginBottom: 30,
    fontWeight: 'bold',
    color: '#00e6e6',
  },
  chartGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '30px',
  },
  chartCard: {
    background: '#002f2f',
    padding: 20,
    borderRadius: 14,
    boxShadow: '0 0 15px #00ffff55',
  },
};
