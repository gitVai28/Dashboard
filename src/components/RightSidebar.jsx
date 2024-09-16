import React, { useEffect, useState } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const CircularProgress = ({ percentage, color, size = 60 }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setProgress(percentage), 100);
    return () => clearTimeout(timer);
  }, [percentage]);

  return (
    <svg width={size} height={size} viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="45" fill="transparent" stroke="#2a2a2a" strokeWidth="10" />
      <circle
        cx="50"
        cy="50"
        r="45"
        fill="transparent"
        stroke={color}
        strokeWidth="10"
        strokeDasharray={`${progress * 2.83} 283`}
        transform="rotate(-90 50 50)"
      />
      <text x="50" y="50" fontFamily="Arial" fontSize="20" fill="white" textAnchor="middle" dy=".3em">
        {`${percentage}%`}
      </text>
    </svg>
  );
};

const RightSidebar = () => {
  // Line chart data for social media platforms and disaster-related content
  const lineChartData = {
    labels: ['Twitter', 'Facebook', 'The Hindu', 'Times of India','Google News'],
    datasets: [
      {
        label: 'Disaster-related Content',
        data: [120, 90, 80, 110, 60], // Sample data
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  // Bar chart data for deaths per day over a week
  const barChartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Deaths per Day',
        data: [5, 10, 6, 12, 7, 8, 15], // Sample data
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: 'white',
        },
      },
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: 'white',
        },
      },
      y: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: 'white',
        },
      },
    },
  };

  return (
    <div style={{ backgroundColor: '#1a1a2e', color: 'white', padding: '20px', display: 'flex', flexDirection: 'column', gap: '60px' }}>
      <div style={{ height: '200px' }}>
        {/* Line chart representing social media disaster-related content */}
        <Line data={lineChartData} options={options} />
      </div>
      <div style={{ height: '200px' }}>
        {/* Bar chart representing deaths per day over a week */}
        <Bar data={barChartData} options={options} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        {/* Circular progress for additional metrics */}
        <CircularProgress percentage={54} color="#ff6b6b" />
        <CircularProgress percentage={34} color="#4ecdc4" />
        <CircularProgress percentage={20} color="#45aaf2" />
        <CircularProgress percentage={10} color="#a55eea" />
      </div>
    </div>
  );
};

export default RightSidebar;
