import { useEffect, useState } from "react";
import "./Recommendations.css";

function Recommendations() {
  const [weather, setWeather] = useState("Sunny");

  useEffect(() => {
    const savedWeather =
      localStorage.getItem("weatherCondition");

    if (savedWeather) {
      if (savedWeather === "Clear Sky") {
        setWeather("Sunny");
      } else if (savedWeather === "Rain Showers") {
        setWeather("Rainy");
      } else if (savedWeather === "Thunderstorm") {
        setWeather("Stormy");
      } else if (
        savedWeather === "Foggy" ||
        savedWeather === "Snowy"
      ) {
        setWeather("Cloudy");
      } else {
        setWeather(savedWeather);
      }
    }
  }, []);

  const recommendations = {
    Sunny: [
      {
        icon: "🏖️",
        title: "Beach Escape",
        text: "Enjoy the sunshine with a relaxing beach visit."
      },
      {
        icon: "📸",
        title: "City Photography",
        text: "Perfect weather for exploring and capturing beautiful places."
      },
      {
        icon: "🚶",
        title: "Nature Walk",
        text: "Take a refreshing walk and explore the outdoors."
      },
      {
        icon: "🌅",
        title: "Sunset View",
        text: "Plan an evening visit to enjoy a beautiful sunset."
      }
    ],

    Cloudy: [
      {
        icon: "📸",
        title: "Photography",
        text: "Soft cloudy light is perfect for outdoor photography."
      },
      {
        icon: "🏛️",
        title: "City Exploration",
        text: "Explore famous landmarks without strong sunlight."
      },
      {
        icon: "☕",
        title: "Cafe Hopping",
        text: "Enjoy a relaxing coffee break while exploring the city."
      },
      {
        icon: "🚶",
        title: "Leisure Walk",
        text: "Take a comfortable walk around your destination."
      }
    ],

    Rainy: [
      {
        icon: "☕",
        title: "Cafe Visit",
        text: "Relax at a cozy cafe and enjoy the rainy atmosphere."
      },
      {
        icon: "🏛️",
        title: "Museum Visit",
        text: "Discover art, culture and history indoors."
      },
      {
        icon: "🛍️",
        title: "Indoor Shopping",
        text: "Spend your day exploring malls and shopping centres."
      },
      {
        icon: "🎬",
        title: "Indoor Entertainment",
        text: "Enjoy movies or other indoor activities."
      }
    ],

    Stormy: [
      {
        icon: "🏠",
        title: "Stay Indoors",
        text: "Avoid unnecessary outdoor travel during severe weather."
      },
      {
        icon: "🎬",
        title: "Movie Time",
        text: "Enjoy a relaxing indoor movie experience."
      },
      {
        icon: "☕",
        title: "Relax at a Cafe",
        text: "Choose a safe indoor location and enjoy some quiet time."
      },
      {
        icon: "📚",
        title: "Indoor Activities",
        text: "Explore books, games or other indoor entertainment."
      }
    ]
  };

  const currentRecommendations =
    recommendations[weather] ||
    recommendations.Sunny;

  return (
    <div className="recommendations-page">

      {/* Hero */}

      <section className="recommendations-hero">

        <span>
          SMART TRAVEL GUIDE
        </span>

        <h1>
          Travel according to
          <br />
          <strong>
            the weather.
          </strong>
        </h1>

        <p>
          Discover activities that match
          your destination's weather conditions.
        </p>

      </section>


      {/* Recommendations */}

      <section className="recommendations-section">

        <div className="recommendations-heading">

          <span>
            WEATHER BASED RECOMMENDATIONS
          </span>

          <h2>
            Recommended for you
          </h2>

          <p>
            Based on your latest weather search,
            these activities are recommended for
            your journey.
          </p>

        </div>


        {/* Current Weather */}

        <div className="current-weather-recommendation">

          <div className="current-weather-icon">

            {weather === "Sunny" && "☀️"}

            {weather === "Cloudy" && "☁️"}

            {weather === "Rainy" && "🌧️"}

            {weather === "Stormy" && "⛈️"}

          </div>

          <div>

            <span>
              CURRENT WEATHER
            </span>

            <h3>
              {weather}
            </h3>

            <p>
              Activities selected based on
              your destination's weather.
            </p>

          </div>

        </div>


        {/* Recommendation Cards */}

        <div className="recommendations-grid">

          {currentRecommendations.map(
            (item, index) => (

              <div
                className="recommendation-card"
                key={index}
              >

                <div className="recommendation-icon">
                  {item.icon}
                </div>

                <h3>
                  {item.title}
                </h3>

                <p>
                  {item.text}
                </p>

                <div className="recommendation-line"></div>

                <span>
                  Recommended for {weather} weather
                </span>

              </div>

            )
          )}

        </div>

      </section>

    </div>
  );
}

export default Recommendations;