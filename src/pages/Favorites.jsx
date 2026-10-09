import { useEffect, useState } from "react";
import "./Favorites.css";

function Favorites() {

  const [favorites, setFavorites] = useState([]);


  // Load favorites
  useEffect(() => {

    const savedFavorites =
      JSON.parse(
        localStorage.getItem("favorites")
      ) || [];

    setFavorites(savedFavorites);

  }, []);


  // Remove favorite
  const removeFavorite = (name) => {

    const updatedFavorites =
      favorites.filter(
        (item) => item.name !== name
      );


    localStorage.setItem(
      "favorites",
      JSON.stringify(updatedFavorites)
    );


    setFavorites(updatedFavorites);

  };


  return (

    <div className="favorites-page">


      {/* ================= HERO ================= */}

      <section className="favorites-hero">

        <span>
          YOUR TRAVEL COLLECTION
        </span>

        <h1>
          Favorite <strong>Places.</strong>
        </h1>

        <p>
          Your saved destinations, ready
          whenever you are.
        </p>

      </section>



      {/* ================= MAIN ================= */}

      <section className="favorites-section">


        <div className="favorites-heading">

          <span>
            SAVED DESTINATIONS
          </span>

          <h2>
            Your Favorites
          </h2>

        </div>



        {/* ================= EMPTY ================= */}

        {favorites.length === 0 ? (

          <div className="empty-favorites">

            <div className="empty-favorite-icon">
              ⭐
            </div>

            <h3>
              No favorite places yet
            </h3>

            <p>
              Search for a destination in
              Weather and add it to your favorites.
            </p>

          </div>

        ) : (


          /* ================= FAVORITES GRID ================= */

          <div className="favorites-grid">


            {favorites.map((place) => (

              <div
                className="favorite-card"
                key={place.name}
              >


                {/* Card Top */}

                <div className="favorite-card-top">

                  <span>
                    SAVED DESTINATION
                  </span>

                  <button
                    onClick={() =>
                      removeFavorite(
                        place.name
                      )
                    }
                  >
                    ×
                  </button>

                </div>



                {/* Icon */}

                <div className="favorite-icon">
                  ⭐
                </div>



                {/* Destination */}

                <h3>
                  {place.name}
                </h3>

                <p className="favorite-country">
                  🌍 {place.country}
                </p>



                {/* Coordinates */}

                <div className="favorite-location">

                  <div>

                    <small>
                      LATITUDE
                    </small>

                    <strong>
                      {place.latitude.toFixed(2)}
                    </strong>

                  </div>


                  <div>

                    <small>
                      LONGITUDE
                    </small>

                    <strong>
                      {place.longitude.toFixed(2)}
                    </strong>

                  </div>

                </div>



                {/* Remove */}

                <button
                  className="remove-favorite-button"
                  onClick={() =>
                    removeFavorite(
                      place.name
                    )
                  }
                >
                  Remove from Favorites
                </button>


              </div>

            ))}


          </div>

        )}


      </section>


    </div>

  );
}

export default Favorites;