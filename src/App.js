import React, { useState, useEffect } from 'react';
import './style.css';

const CountryList = () => {
  const [countries, setCountries] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        if (!response.ok) {
          throw new Error('Failed to fetch');
        }
        const data = await response.json();
        setCountries(data);
      } catch (error) {
        setError(error.message);
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      {/* <header className="App-header">
        <h1>Country Flags</h1>
      </header> */}
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

export default CountryList;