import React, { useState, useEffect } from 'react';
import '../style/stats.css';

const Stats = () => {
  const [currentStateIndex, setCurrentStateIndex] = useState(0);
  const [statsData, setStatsData] = useState([]);
  const [isAnimating, setIsAnimating] = useState(false);

  // Simulated data for Indian states (same as before)
  const allStatesData = [
    [
      { value: "518", label: "Maharashtra" },
      { value: "4818", label: "Kerala" },
      { value: "9376", label: "Gujarat" },
      { value: "4122", label: "Rajasthan" },
      { value: "4122", label: "Punjab" }
    ],
    [
      { value: "6234", label: "Uttar Pradesh" },
      { value: "3521", label: "Tamil Nadu" },
      { value: "2981", label: "Karnataka" },
      { value: "5102", label: "West Bengal" },
      { value: "1872", label: "Bihar" }
    ],
    [
      { value: "4389", label: "Madhya Pradesh" },
      { value: "2765", label: "Andhra Pradesh" },
      { value: "1923", label: "Odisha" },
      { value: "3456", label: "Telangana" },
      { value: "1234", label: "Assam" }
    ],
    // Remaining states
    [
      { value: "5678", label: "Chhattisgarh" },
      { value: "9876", label: "Goa" },
      { value: "6543", label: "Haryana" },
      { value: "3210", label: "Himachal Pradesh" },
      { value: "7890", label: "Jharkhand" }
    ],
    [
      { value: "3452", label: "Arunachal Pradesh" },
      { value: "8976", label: "Manipur" },
      { value: "6573", label: "Meghalaya" },
      { value: "3421", label: "Mizoram" },
      { value: "7980", label: "Nagaland" }
    ],
    [
      { value: "1289", label: "Sikkim" },
      { value: "3945", label: "Tripura" },
      { value: "6587", label: "Uttarakhand" }
    ]
  ];
  

  useEffect(() => {
    const updateStats = () => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentStateIndex((prevIndex) => (prevIndex + 1) % allStatesData.length);
        setStatsData(allStatesData[(currentStateIndex + 1) % allStatesData.length]);
        setIsAnimating(false);
      }, 500); // Half of the transition duration
    };

    setStatsData(allStatesData[currentStateIndex]);
    const interval = setInterval(updateStats, 10000); // 30 seconds

    return () => clearInterval(interval);
  }, [currentStateIndex]);

  return (
    <div className="statistics">
      {statsData.map((stat, index) => (
        <div className={`stat-item ${isAnimating ? 'animating' : ''}`} key={index}>
          <div className="circle">
            <div className={`radar-sweep delay-${index + 1}`}></div>
          </div>
          <div className="data">
            <div>{stat.value}</div>
            <div>{stat.label}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Stats;