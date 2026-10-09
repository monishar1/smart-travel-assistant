import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Weather from "./pages/Weather";
import Explore from "./pages/Explore";
import Recommendations from "./pages/Recommendations";
import TripPlanner from "./pages/TripPlanner";
import Budget from "./pages/Budget";
import Favorites from "./pages/Favorites";
import MyTrips from "./pages/MyTrips";

import "./App.css";


function App() {

  return (

    <BrowserRouter>

      <Navbar />

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/weather"
          element={<Weather />}
        />

        <Route
          path="/explore"
          element={<Explore />}
        />

        <Route
          path="/recommendations"
          element={<Recommendations />}
        />

        <Route
          path="/trip-planner"
          element={<TripPlanner />}
        />

        <Route
          path="/budget"
          element={<Budget />}
        />

        <Route
          path="/favorites"
          element={<Favorites />}
        />

        <Route
          path="/my-trips"
          element={<MyTrips />}
        />

      </Routes>

    </BrowserRouter>

  );
}

export default App;