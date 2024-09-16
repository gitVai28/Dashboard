import React, { useState, useEffect } from 'react';

const LeftSidebar = () => {
  const [filters, setFilters] = useState({
    disasterType: '',
    location: '',
    date: '',
  });

  const [summaries, setSummaries] = useState([]);

  // Sample JSON data (in a real application, this would be imported or fetched)
  const jsonData = [
    {
      "Date": "38/08/24",
      "Time": "23:38:22",
      "DisasterType": "storm",
      "Location": "V, Gujaratadodara",
      "Summary": "Gujarat and Vadodara have been hit by heavy rain and flooding. Flooding has been reported in parts of the state. Flood warnings and advisories have been issued."
    },
    {
      "Date": "30/08/24",
      "Time": "23:08:56",
      "DisasterType": "flood",
      "Location": "Khambala, Gujarat",
      "Summary": "Gujarat CM: Cyclone Asna has been declared a disaster in the state. Floods have been reported in several parts of the state, including Ahmedabad."
    },
    {
      "Date": "31/08/24",
      "Time": "22:20:52",
      "DisasterType": "flood",
      "Location": "V, Gujarat, Gujaratadodara",
      "Summary": "Crocodile spotted on roof of a house in Gujarat's Vadodara. 35 dead, 140 dams and 24 rivers overflowing in Gujarat. Around 8,500 residents relocated and rescued."
    },
    {
      "Date": "30/08/24",
      "Time": "21:31:58",
      "DisasterType": "flood",
      "Location": "India, Bangladesh",
      "Summary": "5/5 have grown in Bangladesh since Sheikh Hasina's downfall and her subsequent refuge in India. English: https://t.co/xeLKL7d1WB Hindi: http://www.dailymail.co."
    }
  ];

  // Extract unique values for dropdowns
  const disasterTypes = [...new Set(jsonData.map(item => item.DisasterType))];
  const locations = [...new Set(jsonData.flatMap(item => item.Location.split(', ')))];
  const dates = [...new Set(jsonData.map(item => item.Date))];

  useEffect(() => {
    filterSummaries();
  }, [filters]);

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: value
    }));
  };

  const filterSummaries = () => {
    const filteredSummaries = jsonData.filter(item => {
      return (
        (filters.disasterType === '' || item.DisasterType === filters.disasterType) &&
        (filters.location === '' || item.Location.includes(filters.location)) &&
        (filters.date === '' || item.Date.toString() === filters.date)
      );
    });
    setSummaries(filteredSummaries);
  };

  const sidebarStyle = {
    backgroundColor: '#1e1e2f',
    color: 'white',
    padding: '20px',
    width: '430px',
    height: '80vh',
    display: 'flex',
    flexDirection: 'column',
  };

  const filterStyle = {
    marginBottom: '15px',
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '5px',
    color: '#8a8d93',
  };

  const selectStyle = {
    width: '100%',
    padding: '8px',
    backgroundColor: '#27293d',
    color: 'white',
    border: '1px solid #444',
    borderRadius: '4px',
  };

  const summaryBoxStyle = {
    backgroundColor: '#27293d',
    border: '1px solid #444',
    borderRadius: '4px',
    padding: '10px',
    marginBottom: '10px',
  };

  const summariesContainerStyle = {
    overflowY: 'scroll',
    flex: 1,
  };

  const getLocationColor = (location) => {
    const colors = ['#ff9ff3', '#feca57', '#ff6b6b', '#48dbfb', '#ff9ff3'];
    const index = locations.indexOf(location) % colors.length;
    return colors[index];
  };

  return (
    <div style={sidebarStyle}>
      <h2 style={{ marginBottom: '20px', fontSize: '1.5em', color: '#fff' }}>Filters</h2>
      
      <div style={filterStyle}>
        <label htmlFor="disasterType" style={labelStyle}>Type of Disaster</label>
        <select
          id="disasterType"
          name="disasterType"
          value={filters.disasterType}
          onChange={handleFilterChange}
          style={selectStyle}
        >
          <option value="">All Disaster Types</option>
          {disasterTypes.map((type, index) => (
            <option key={index} value={type}>{type}</option>
          ))}
        </select>
      </div>

      <div style={filterStyle}>
        <label htmlFor="location" style={labelStyle}>Location</label>
        <select
          id="location"
          name="location"
          value={filters.location}
          onChange={handleFilterChange}
          style={selectStyle}
        >
          <option value="">All Locations</option>
          {locations.map((location, index) => (
            <option key={index} value={location} style={{color: getLocationColor(location)}}>
              {location}
            </option>
          ))}
        </select>
      </div>

      <div style={filterStyle}>
        <label htmlFor="date" style={labelStyle}>Date</label>
        <select
          id="date"
          name="date"
          value={filters.date}
          onChange={handleFilterChange}
          style={selectStyle}
        >
          <option value="">All Dates</option>
          {dates.map((date, index) => (
            <option key={index} value={date}>{date}</option>
          ))}
        </select>
      </div>

      <h3 style={{ marginTop: '20px', marginBottom: '10px', color: '#fff' }}>Summaries</h3>
      <div style={summariesContainerStyle}>
        {summaries.map((item, index) => (
          <div key={index} style={summaryBoxStyle}>
            <p style={{ color: getLocationColor(item.Location.split(', ')[0]) }}>
              <strong>Location:</strong> {item.Location}
            </p>
            <p><strong>Summary:</strong> {item.Summary}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeftSidebar;