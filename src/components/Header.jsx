import React, { useState, useEffect } from "react";

const Header = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [temperature, setTemperature] = useState("30°C"); // You can replace this with real data later

  useEffect(() => {
    // Update time every second
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Clean up timer when the component is unmounted
    return () => clearInterval(timer);
  }, []);

  return (
    <div
      className="flex justify-between items-center p-4 bg-blue-600 text-white"
    >
      <h1 className="text-3xl font-bold">Disaster Dashboard</h1>
      <div className="flex flex-col items-end text-right">
        <span className="text-sm">{currentTime.toLocaleDateString()}</span>
        <span className="text-sm mt-1">{currentTime.toLocaleTimeString()}</span>
        <span className="text-sm mt-2">Temp: {temperature}</span>
      </div>
    </div>
  );
};

export default Header;
