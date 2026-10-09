import { useState } from "react";
import "./TripPlanner.css";

function TripPlanner() {

  const [destination, setDestination] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [activities, setActivities] = useState("");

  const handleCreateTrip = (e) => {
  e.preventDefault();

  if (!destination || !startDate || !endDate) {
    alert("Please fill destination and travel dates.");
    return;
  }

  const newTrip = {
    id: Date.now(),
    destination: destination,
    startDate: startDate,
    endDate: endDate,
    activities: activities
  };

  const existingTrips =
    JSON.parse(localStorage.getItem("trips")) || [];

  const updatedTrips = [
    ...existingTrips,
    newTrip
  ];

  localStorage.setItem(
    "trips",
    JSON.stringify(updatedTrips)
  );

  alert("Trip created successfully! ✈️");

  setDestination("");
  setStartDate("");
  setEndDate("");
  setActivities("");
};


  return (
    <div className="trip-planner-page">

      {/* Hero */}

      <section className="trip-hero">

        <div className="trip-hero-content">

          <span>
            YOUR JOURNEY
          </span>

          <h1>
            Plan your perfect
            <br />
            <strong>escape.</strong>
          </h1>

          <p>
            Organize your destination, dates and activities
            in one beautiful travel plan.
          </p>

        </div>

      </section>


      {/* Planner */}

      <section className="planner-section">

        <div className="planner-header">

          <span>
            CREATE A NEW TRIP
          </span>

          <h2>
            Start planning
          </h2>

          <p>
            Add your travel details to create your itinerary.
          </p>

        </div>


        <div className="planner-layout">


          {/* Form */}

          <div className="planner-card">

            <form onSubmit={handleCreateTrip}>


              {/* Destination */}

              <div className="form-group">

                <label>
                  Destination
                </label>

                <div className="input-box">

                  <span>
                    📍
                  </span>

                  <input
                    type="text"
                    placeholder="Where are you going?"
                    value={destination}
                    onChange={(e) =>
                      setDestination(e.target.value)
                    }
                  />

                </div>

              </div>


              {/* Dates */}

              <div className="date-row">


                <div className="form-group">

                  <label>
                    Start Date
                  </label>

                  <div className="input-box">

                    <span>
                      📅
                    </span>

                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) =>
                        setStartDate(e.target.value)
                      }
                    />

                  </div>

                </div>


                <div className="form-group">

                  <label>
                    End Date
                  </label>

                  <div className="input-box">

                    <span>
                      📅
                    </span>

                    <input
                      type="date"
                      value={endDate}
                      onChange={(e) =>
                        setEndDate(e.target.value)
                      }
                    />

                  </div>

                </div>

              </div>


              {/* Activities */}

              <div className="form-group">

                <label>
                  Activities
                </label>

                <textarea
                  placeholder="Beach, sightseeing, shopping..."
                  value={activities}
                  onChange={(e) =>
                    setActivities(e.target.value)
                  }
                />

              </div>


              <button
                className="create-trip-button"
                type="submit"
              >
                Create My Trip →
              </button>

            </form>

          </div>


          {/* Preview */}

          <div className="trip-preview">

            <span>
              TRIP PREVIEW
            </span>

            <div className="preview-icon">
              ✈️
            </div>

            <h3>
              {destination || "Your destination"}
            </h3>

            <p>
              {startDate && endDate
                ? `${startDate} — ${endDate}`
                : "Select your travel dates"}
            </p>

            <div className="preview-line"></div>

            <small>
              Your personalized itinerary
              will appear here.
            </small>

          </div>

        </div>

      </section>

    </div>
  );
}

export default TripPlanner;