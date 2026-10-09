
import { useState } from "react";
import "./Weather.css";

import getLocation from "../services/LocationService";
import getWeather from "../services/WeatherService";

function Weather() {
  const [city, setCity] = useState("");
  const [location, setLocation] = useState(null);
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isFavorite, setIsFavorite] = useState(false);

  const getWeatherInfo = (code) => {
    if (code === 0) {
      return { icon: "☀️", title: "Sunny" };
    }

    if (code >= 1 && code <= 3) {
      return { icon: "☁️", title: "Cloudy" };
    }

    if (code >= 45 && code <= 48) {
      return { icon: "🌫️", title: "Foggy" };
    }

    if (code >= 51 && code <= 67) {
      return { icon: "🌧️", title: "Rainy" };
    }

    if (code >= 71 && code <= 77) {
      return { icon: "❄️", title: "Snowy" };
    }

    if (code >= 80 && code <= 82) {
      return { icon: "🌦️", title: "Rainy" };
    }

    if (code >= 95) {
      return { icon: "⛈️", title: "Stormy" };
    }

    return { icon: "🌤️", title: "Cloudy" };
  };

  const searchWeather = async () => {
    if (!city.trim()) {
      setError("Please enter a destination");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const locationData = await getLocation(city);

      console.log("Location:", locationData);

      const weatherData = await getWeather(
        locationData.latitude,
        locationData.longitude
      );

      console.log("Weather:", weatherData);

      setLocation(locationData);
      setWeather(weatherData);

      // Save weather condition for Recommendations
      const condition = getWeatherInfo(
        weatherData.current.weather_code
      ).title;

      localStorage.setItem("weatherCondition", condition);

      // Check whether the destination is a favorite
      const savedFavorites =
        JSON.parse(localStorage.getItem("favorites")) || [];

      const alreadyFavorite = savedFavorites.some(
        (item) => item.name === locationData.name
      );

      setIsFavorite(alreadyFavorite);
    } catch (error) {
      console.error("Weather Error:", error);

      setError(
        "Unable to get weather. Please try another destination."
      );

      setLocation(null);
      setWeather(null);
      setIsFavorite(false);
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = () => {
    if (!location) return;

    const savedFavorites =
      JSON.parse(localStorage.getItem("favorites")) || [];

    const alreadyFavorite = savedFavorites.some(
      (item) => item.name === location.name
    );

    if (alreadyFavorite) {
      const updatedFavorites = savedFavorites.filter(
        (item) => item.name !== location.name
      );

      localStorage.setItem(
        "favorites",
        JSON.stringify(updatedFavorites)
      );

      setIsFavorite(false);
    } else {
      const newFavorite = {
        name: location.name,
        country: location.country,
        latitude: location.latitude,
        longitude: location.longitude,
      };

      const updatedFavorites = [
        ...savedFavorites,
        newFavorite,
      ];

      localStorage.setItem(
        "favorites",
        JSON.stringify(updatedFavorites)
      );

      setIsFavorite(true);
    }
  };

  const weatherInfo = weather
    ? getWeatherInfo(weather.current.weather_code)
    : null;

  // Display an alert only when a warning condition exists
  const getWeatherAlert = () => {
    if (!weather?.current) return null;

    const code = weather.current.weather_code;
    const temperature = weather.current.temperature_2m;

    // Thunderstorm
    if (code >= 95) {
      return {
        icon: "⛈️",
        title: "Storm Alert",
        message:
          "Thunderstorm conditions detected. Please take care while travelling.",
      };
    }

    // Rain and rain showers
    if (
      (code >= 51 && code <= 67) ||
      (code >= 80 && code <= 82)
    ) {
      return {
        icon: "🌧️",
        title: "Rain Alert",
        message:
          "Rain is expected. Consider carrying an umbrella while travelling.",
      };
    }

    // Snow
    if (code >= 71 && code <= 77) {
      return {
        icon: "❄️",
        title: "Snow Alert",
        message:
          "Snowy conditions detected. Check local travel conditions before your journey.",
      };
    }

    // High temperature
    if (temperature >= 35) {
      return {
        icon: "🌡️",
        title: "High Temperature",
        message:
          "The temperature is high. Stay hydrated and avoid prolonged outdoor activities.",
      };
    }

    // Normal conditions: no alert box
    return null;
  };

  const weatherAlert = getWeatherAlert();

  return (
    <div className="weather-page">
      <div className="weather-content">
        <div className="weather-heading">
          <span>WEATHER EXPERIENCE</span>

          <h1>
            Know the weather.
            <br />
            <strong>Travel with confidence.</strong>
          </h1>

          <p>
            Check the current weather conditions of your
            destination before you begin your journey.
          </p>
        </div>

        <div className="weather-search-box">
          <div className="search-icon">⌕</div>

          <input
            type="text"
            placeholder="Search your destination..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                searchWeather();
              }
            }}
          />

          <button
            onClick={searchWeather}
            disabled={loading}
          >
            {loading ? "Checking..." : "Check Weather"}
          </button>
        </div>

        {/* Loading message */}
        {loading && (
          <div className="weather-loading">
            <div className="loading-icon">✈️</div>

            <div className="loading-content">
              <span>WEATHER ASSISTANT</span>
              <h3>Checking the weather...</h3>
              <p>
                Finding the latest weather information for
                your destination.
              </p>
            </div>
          </div>
        )}

        {error && (
          <p className="weather-error">{error}</p>
        )}

        {location && weather && (
          <div className="weather-dashboard">
            <div className="dashboard-top">
              <div>
                <p className="location-label">
                  CURRENT DESTINATION
                </p>

                <h2>{location.name}</h2>

                <p className="date">{location.country}</p>

                <button
                  className={`favorite-button ${
                    isFavorite ? "favorite-active" : ""
                  }`}
                  onClick={toggleFavorite}
                >
                  {isFavorite
                    ? "★ Saved"
                    : "☆ Add to Favorites"}
                </button>
              </div>

              <div className="weather-status">
                <span className="sun">{weatherInfo.icon}</span>

                <div>
                  <h3>{weatherInfo.title}</h3>
                  <p>Live weather information</p>
                </div>
              </div>
            </div>

            {/* Show alert only when an alert condition exists */}
            {weatherAlert && (
              <div className="weather-alert">
                <div className="alert-icon">
                  {weatherAlert.icon}
                </div>

                <div className="alert-content">
                  <span>TRAVEL WEATHER ALERT</span>
                  <h3>{weatherAlert.title}</h3>
                  <p>{weatherAlert.message}</p>
                </div>
              </div>
            )}

            <div className="temperature-section">
              <div className="temperature">
                {Math.round(
                  weather.current.temperature_2m
                )}

                <span>
                  {weather.current_units.temperature_2m}
                </span>
              </div>

              <div className="temperature-info">
                <p>
                  Feels like{" "}
                  {Math.round(
                    weather.current.apparent_temperature
                  )}
                  °C
                </p>

                <div className="temperature-line"></div>

                <small>Current temperature</small>
              </div>
            </div>

            <div className="weather-stats">
              <div className="weather-stat">
                <span>💧</span>
                <div>
                  <small>Humidity</small>
                  <strong>
                    {weather.current.relative_humidity_2m}%
                  </strong>
                </div>
              </div>

              <div className="weather-stat">
                <span>♨</span>
                <div>
                  <small>Wind Speed</small>
                  <strong>
                    {weather.current.wind_speed_10m}{" "}
                    {weather.current_units.wind_speed_10m}
                  </strong>
                </div>
              </div>

              <div className="weather-stat">
                <span>⌖</span>
                <div>
                  <small>Latitude</small>
                  <strong>
                    {location.latitude.toFixed(2)}
                  </strong>
                </div>
              </div>

              <div className="weather-stat">
                <span>◎</span>
                <div>
                  <small>Longitude</small>
                  <strong>
                    {location.longitude.toFixed(2)}
                  </strong>
                </div>
              </div>
            </div>

            {weather.daily?.time && (
              <div className="forecast-section">
                <div className="forecast-heading">
                  <span>UPCOMING WEATHER</span>
                  <h3>5 Day Forecast</h3>
                </div>

                <div className="forecast-container">
                  {weather.daily.time.map((date, index) => {
                    const code =
                      weather.daily.weather_code?.[index] ?? 0;

                    const forecastInfo = getWeatherInfo(code);

                    const maxTemp =
                      weather.daily.temperature_2m_max?.[index];

                    const minTemp =
                      weather.daily.temperature_2m_min?.[index];

                    return (
                      <div
                        className="forecast-card"
                        key={date}
                      >
                        <p className="forecast-date">
                          {new Date(
                            `${date}T12:00:00`
                          ).toLocaleDateString("en-US", {
                            weekday: "short",
                          })}
                        </p>

                        <div className="forecast-icon">
                          {forecastInfo.icon}
                        </div>

                        <h4>{forecastInfo.title}</h4>

                        <div className="forecast-temperature">
                          <strong>
                            {maxTemp != null
                              ? `${Math.round(maxTemp)}°`
                              : "--"}
                          </strong>

                          <span>
                            {minTemp != null
                              ? `${Math.round(minTemp)}°`
                              : "--"}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        {!location && !loading && !error && (
          <div className="travel-message">
            <div className="message-icon">✦</div>

            <div>
              <h3>Where are you travelling?</h3>
              <p>
                Search for a destination above to discover
                its current weather conditions.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Weather;
