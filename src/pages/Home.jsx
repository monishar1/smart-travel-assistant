import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

function Home() {
  const navigate = useNavigate();

  const [destination, setDestination] = useState("");

  const handleSearch = () => {
    if (!destination.trim()) {
      navigate("/weather");
      return;
    }

    navigate("/weather");
  };

  return (
    <div className="home-page">

      {/* HERO SECTION */}

      <section className="hero-section">

        <div className="hero-content">

          <p className="hero-small-title">
            ✈️ TRAVEL SMARTER
          </p>

          <h1>
            Explore the World
            <br />
            <span>Plan Your Journey</span>
          </h1>

          <p className="hero-description">
            Discover destinations, check real-time weather,
            plan your trip, manage your budget and travel
            smarter with Smart Travel Assistant.
          </p>


          {/* SEARCH */}

          <div className="search-box">

            <input
              type="text"
              placeholder="Where do you want to go?"
              value={destination}
              onChange={(e) =>
                setDestination(e.target.value)
              }
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch();
                }
              }}
            />

            <button onClick={handleSearch}>
              🔍 Search
            </button>

          </div>


          {/* EXPLORE BUTTON */}

          <button
            className="explore-button"
            onClick={() => navigate("/explore")}
          >
            Explore Destinations →
          </button>

        </div>

      </section>


      {/* FEATURES SECTION */}

      <section className="features-section">

        <p className="features-small-title">
          SMART TRAVEL EXPERIENCE
        </p>

        <h2>
          Everything You Need
          <br />
          <span>for Your Trip</span>
        </h2>

        <p className="features-subtitle">
          Plan your perfect journey in one place
        </p>


        <div className="features-container">


          {/* WEATHER */}

          <div
            className="feature-card"
            onClick={() => navigate("/weather")}
          >

            <div className="feature-icon">
              🌦️
            </div>

            <h3>
              Weather
            </h3>

            <p>
              Get real-time weather information
              and forecasts for your destination.
            </p>

            <span className="feature-link">
              Check Weather →
            </span>

          </div>


          {/* EXPLORE */}

          <div
            className="feature-card"
            onClick={() => navigate("/explore")}
          >

            <div className="feature-icon">
              📍
            </div>

            <h3>
              Explore
            </h3>

            <p>
              Discover beautiful destinations
              and popular tourist attractions.
            </p>

            <span className="feature-link">
              Explore Places →
            </span>

          </div>


          {/* TRIP PLANNER */}

          <div
            className="feature-card"
            onClick={() => navigate("/trip-planner")}
          >

            <div className="feature-icon">
              📅
            </div>

            <h3>
              Plan Your Trip
            </h3>

            <p>
              Create a travel plan and organize
              your activities easily.
            </p>

            <span className="feature-link">
              Plan Trip →
            </span>

          </div>


          {/* BUDGET */}

          <div
            className="feature-card"
            onClick={() => navigate("/budget")}
          >

            <div className="feature-icon">
              💰
            </div>

            <h3>
              Manage Budget
            </h3>

            <p>
              Track your travel expenses and
              manage your trip budget easily.
            </p>

            <span className="feature-link">
              Manage Budget →
            </span>

          </div>

        </div>

      </section>


      {/* SMART FEATURES SECTION */}

      <section className="home-highlight">

        <div className="highlight-content">

          <p className="highlight-label">
            YOUR JOURNEY. YOUR WAY.
          </p>

          <h2>
            Travel smarter with
            <span> one simple assistant.</span>
          </h2>

          <p>
            From checking destination weather to
            planning trips, saving favorite places
            and tracking expenses, everything you
            need for a better journey is available
            in one place.
          </p>

          <button
            onClick={() =>
              navigate("/trip-planner")
            }
          >
            Start Planning →
          </button>

        </div>

        <div className="highlight-icon">
          ✈️
        </div>

      </section>

    </div>
  );
}

export default Home;