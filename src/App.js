import React, { useState, useEffect } from 'react';
import './style.css';

function App() {
  const [countries, setCountries] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch('https://restcountries.com/v3.1/all')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch countries');
        }
        return response.json();
      })
      .then(data => {
        setCountries(data);
      })
      .catch(error => {
        setError(error.message);
        console.error('Error fetching data:', error); // Log the error to the console
      });
  };
  
  return (
    <div className="App">
      <header className="App-header">
        <h1>Country Flags</h1>
      </header>
      <div className="flags-container">
        {error && <div className="error">{error}</div>}
        {countries.map(country => (
          <div key={country.name.common} className="country">
            <img
              src={country.flags.png}
              alt={`Flag of ${country.name.common}`}
            />
            <p>{country.name.common}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;