import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Chart.js imports
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

// Register Chart.js components
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

export default function Dashboard() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:4000/get-data')
      .then(res => setData(res.data))
      .catch(err => console.error('Error fetching hardware data:', err));
  }, []);

  // Prepare chart data

  // 1) Pie Chart: department distribution
  const deptCounts = data.reduce((acc, item) => {
    acc[item.department] = (acc[item.department] || 0) + 1;
    return acc;
  }, {});

  const pieData = {
    labels: Object.keys(deptCounts),
    datasets: [{
      data: Object.values(deptCounts),
      backgroundColor: [
        '#00ffff', '#0099cc', '#006666', '#33cccc', '#66ffff', '#99ffff'
      ],
      hoverOffset: 30,
    }]
  };

  // 2) Bar Chart: status counts
  const statusCounts = data.reduce((acc, item) => {
    acc[item.status] = (acc[item.status] || 0) + 1;
    return acc;
  }, {});

  const barData = {
    labels: Object.keys(statusCounts),
    datasets: [{
      label: 'Devices',
      data: Object.values(statusCounts),
      backgroundColor: '#00ffffaa',
      borderColor: '#00ffff',
      borderWidth: 1,
    }]
  };

  // 3) Line Chart: purchases over time
  const purchasesByMonth = {};

  data.forEach(item => {
    if (item.purchasedon) {
      const date = new Date(item.purchasedon);
      if (!isNaN(date)) {
        const monthYear = `${date.getMonth() + 1}-${date.getFullYear()}`;
        purchasesByMonth[monthYear] = (purchasesByMonth[monthYear] || 0) + 1;
      }
    }
  });

  const sortedMonths = Object.keys(purchasesByMonth).sort((a, b) => {
    const [mA, yA] = a.split('-').map(Number);
    const [mB, yB] = b.split('-').map(Number);
    return yA === yB ? mA - mB : yA - yB;
  });

  const lineData = {
    labels: sortedMonths,
    datasets: [{
      label: 'Purchases Over Time',
      data: sortedMonths.map(m => purchasesByMonth[m]),
      fill: false,
      backgroundColor: '#00ffff',
      borderColor: '#00ffff',
      tension: 0.3,
    }]
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Hardware Inventory Analytics Dashboard</h1>

      <div style={styles.chartGrid}>
        <div style={styles.chartCard} className="animate-slideFade">
          <h3>Department Distribution</h3>
          <Pie data={pieData} />
        </div>

        <div style={styles.chartCard} className="animate-slideFade" >
          <h3>Device Status</h3>
          <Bar data={barData} options={{
            responsive: true,
            plugins: {
              legend: { display: false },
              tooltip: { enabled: true }
            },
            scales: {
              y: { beginAtZero: true, precision: 0 }
            }
          }} />
        </div>

        <div style={styles.chartCard} className="animate-slideFade">
          <h3>Purchases Over Time</h3>
          <Line data={lineData} options={{
            responsive: true,
            plugins: {
              legend: { position: 'top' },
              tooltip: { enabled: true }
            },
            scales: {
              y: { beginAtZero: true, precision: 0 }
            }
          }} />
        </div>
      </div>

      <style>{`
        /* Animate fade-in + slide from left */
        .animate-slideFade {
          opacity: 0;
          transform: translateX(-40px);
          animation: slideFadeIn 0.8s forwards;
          animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        }
        .animate-slideFade:nth-child(1) {
          animation-delay: 0.2s;
        }
        .animate-slideFade:nth-child(2) {
          animation-delay: 0.4s;
        }
        .animate-slideFade:nth-child(3) {
          animation-delay: 0.6s;
        }

        @keyframes slideFadeIn {
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        /* Gradient animation for title */
        @keyframes gradientShift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        /* Responsive tweaks for grid */
        @media (max-width: 768px) {
          .chartGrid {
            grid-template-columns: repeat(1, 1fr) !important;
          }
        }
      `}</style>
    </div>
  );
}
const styles = {
  container: {
    padding: '30px 20px 40px 20px',  // no left margin or big left padding
    minHeight: '100vh',
    background: 'radial-gradient(circle, #0a0a0a, #001f1f)',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    color: '#00ffff',
    boxSizing: 'border-box',
    maxWidth: '100vw',  // full width viewport
  },
  title: {
    textAlign: 'center',
    fontSize: '2rem',
    marginBottom: 40,
    fontWeight: '700',
    background: 'linear-gradient(90deg, #00f0ff, #0099cc)',
    backgroundClip: 'text',
    color: 'transparent',
    animation: 'gradientShift 4s ease infinite',
    backgroundSize: '200% auto',
  },
chartGrid: {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
  gap: 24,
  width: '100%',
  maxWidth: '90vw',  // 90% of viewport width
  margin: '0 auto',
}
,
  chartCard: {
    background: 'linear-gradient(135deg, #003c3c, #006666)',
    padding: 20,
    borderRadius: 14,
    boxShadow: '0 0 15px #00ffff44',
    color: '#00ffffcc',
  },
  
};

