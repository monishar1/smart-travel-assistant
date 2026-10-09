import { useState } from "react";
import searchPopularPlaces from "../services/ExploreService";
import "./Explore.css";

function Explore() {
  const [search, setSearch] = useState("");
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchedPlace, setSearchedPlace] = useState("");

  const handleSearch = async () => {
    if (!search.trim()) {
      setError("Please enter a destination.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setPlaces([]);

      const results = await searchPopularPlaces(search);

      if (results.length === 0) {
        setError(
          "No popular places found. Try another destination."
        );
      } else {
        setPlaces(results);
        setSearchedPlace(search);
      }
    } catch (err) {
      setError(
        "Unable to load destinations. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="explore-page">

      {/* HERO */}

      <section className="explore-hero">

        <div className="explore-hero-content">

          <span>
            DISCOVER THE WORLD
          </span>

          <h1>
            Find your next
            <br />
            <strong>
              beautiful escape.
            </strong>
          </h1>

          <p>
            Search any destination and discover
            popular places automatically.
          </p>


          {/* SEARCH */}

          <div className="explore-search">

            <span>
              🔍
            </span>

            <input
              type="text"
              placeholder="Search destinations..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              onKeyDown={handleKeyDown}
            />

            <button onClick={handleSearch}>
              Explore
            </button>

          </div>

        </div>

      </section>


      {/* RESULTS */}

      <section className="destinations-section">

        <div className="section-heading">

          <div>

            <span>
              TRAVEL INSPIRATION
            </span>

            <h2>
              {searchedPlace
                ? `Popular Places in ${searchedPlace}`
                : "Explore Destinations"}
            </h2>

          </div>

          <p>
            Discover 3 places automatically
            based on your search.
          </p>

        </div>


        {/* LOADING */}

        {loading && (
          <div className="explore-message">

            <div className="explore-loader">
              ✈️
            </div>

            <h3>
              Discovering places...
            </h3>

            <p>
              Finding popular destinations for you.
            </p>

          </div>
        )}


        {/* ERROR */}

        {!loading && error && (
          <div className="explore-message error-message">

            <div className="explore-message-icon">
              🔍
            </div>

            <h3>
              No places found
            </h3>

            <p>
              {error}
            </p>

          </div>
        )}


        {/* INITIAL STATE */}

        {!loading &&
          !error &&
          places.length === 0 && (

            <div className="explore-message">

              <div className="explore-message-icon">
                🌍
              </div>

              <h3>
                Start Exploring
              </h3>

              <p>
                Search for a city, state or destination
                to discover 3 popular places.
              </p>

            </div>

          )}


        {/* DESTINATION CARDS */}

        {!loading && places.length > 0 && (

          <div className="destination-grid">

            {places.map((place, index) => (

              <div
                className="destination-card"
                key={place.name}
              >

                {/* IMAGE */}

                <div className="destination-image">

                  {place.image ? (
                    <img
                      src={place.image}
                      alt={place.name}
                    />
                  ) : (
                    <div className="destination-image-fallback">
                      🌍
                    </div>
                  )}

                  <div className="destination-number">
                    0{index + 1}
                  </div>

                </div>


                {/* CONTENT */}

                <div className="destination-content">

                  <span>
                    POPULAR PLACE
                  </span>

                  <h3>
                    {place.name}
                  </h3>

                  <p>
                    {place.description}
                  </p>

                  <a
                    href={place.wikipediaUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="destination-link"
                  >
                    Discover More →
                  </a>

                </div>

              </div>

            ))}

          </div>

        )}

      </section>

    </div>
  );
}

export default Explore;