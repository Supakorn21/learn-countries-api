import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [countries, setCountries] = useState([]);
  const [singleCountry, setSingleCountry] = useState("");
  const [cities, setCities] = useState(null);
  const [singleCity, setSingleCity] = useState("");
  const [submit, setSubmit] = useState(false);

  const fetchCountries = async () => {
    try {
      const country = await axios.get(
        "https://countriesnow.space/api/v0.1/countries"
      );
      setCountries(country.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCities = (country) => {
    setSubmit(false)
    setSingleCity(null)

    setSingleCountry(country);
    const findCities = countries.find((c) => c.country === country);
    setCities(findCities.cities);
  };

  const submitHandle = () => {
    if (singleCountry && singleCity) {
      setSubmit(true);
    }
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  return (
    <div className="App">
      <div className="App-header">
        <h1>เลือกเมืองเกิดของคุณ</h1>
        <div>
          <select
            onChange={(e) => fetchCities(e.target.value)}
            value={singleCountry}
          >
            <option disabled selected hidden>
             เลือกประเทศ
            </option>
            {countries &&
              countries.map((country) => (
                <option key={`${country.country}`} value={country.country}>
                  {country.country}
                </option>
              ))}
          </select>

          {cities && (
            <select
              onChange={(e) => setSingleCity(e.target.value)}
              value={singleCity}
            >
              <option disabled selected hidden>
                เลือกเมืองเกิด
              </option>

              {cities.map((city) => (
                <option value={city} key={city}>
                  {city}
                </option>
              ))}
            </select>
          )}
          <button onClick={submitHandle}>แสดง</button>
        </div>
        {submit && (
          <h3>
            ประเทศของคุณคือ {singleCountry} และเมืองของคุณคือ {singleCity}
          </h3>
        )}
      </div>
    </div>
  );
}

export default App;
