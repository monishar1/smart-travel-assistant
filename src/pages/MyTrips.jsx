import { useEffect, useState } from "react";
import "./MyTrips.css";

function MyTrips() {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    const savedTrips =
      JSON.parse(localStorage.getItem("trips")) || [];

    setTrips(savedTrips);
  }, []);

  const deleteTrip = (id) => {
    const updatedTrips = trips.filter(
      (trip) => trip.id !== id
    );

    localStorage.setItem(
      "trips",
      JSON.stringify(updatedTrips)
    );

    setTrips(updatedTrips);
  };

  return (
    <div className="my-trips-page">

      {/* Hero Section */}
      <section className="my-trips-hero">
        <span>YOUR TRAVEL COLLECTION</span>

        <h1>
          My <strong>Trips.</strong>
        </h1>

        <p>
          Your saved journeys, all in one place.
        </p>
      </section>

      {/* Trips Section */}
      <section className="my-trips-section">

        <div className="my-trips-heading">
          <span>SAVED JOURNEYS</span>
          <h2>Your Trips</h2>
        </div>

        {trips.length === 0 ? (

          /* Empty State */
          <div className="empty-trips">

            <div className="empty-trip-icon">
              ✈️
            </div>

            <h3>No trips yet</h3>

            <p>
              Create your first trip from the
              Trip Planner.
            </p>

          </div>

        ) : (

          /* Trip Cards */
          <div className="trips-grid">

            {trips.map((trip) => (

              <div
                className="trip-card"
                key={trip.id}
              >

                <div className="trip-card-top">

                  <span>
                    TRAVEL PLAN
                  </span>

                  <button
                    onClick={() =>
                      deleteTrip(trip.id)
                    }
                  >
                    ×
                  </button>

                </div>

                <div className="trip-card-icon">
                  ✈️
                </div>

                <h3>
                  {trip.destination}
                </h3>

                <p className="trip-dates">
                  📅 {trip.startDate}

                  <span>→</span>

                  {trip.endDate}
                </p>

                {trip.activities && (

                  <div className="trip-activities">

                    <small>
                      ACTIVITIES
                    </small>

                    <p>
                      {trip.activities}
                    </p>

                  </div>

                )}

                <button
                  className="delete-trip-button"
                  onClick={() =>
                    deleteTrip(trip.id)
                  }
                >
                  Delete Trip
                </button>

              </div>

            ))}

          </div>

        )}

      </section>

    </div>
  );
}

export default MyTrips;