import { NavLink } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">

      <NavLink to="/" className="logo">
        🌦️ Smart Travel Assistant
      </NavLink>

      <div className="nav-links">

        <NavLink to="/" end>
          Home
        </NavLink>

        <NavLink to="/weather">
          Weather
        </NavLink>

        <NavLink to="/explore">
          Explore
        </NavLink>

        <NavLink to="/recommendations">
          Recommendations
        </NavLink>

        <NavLink to="/trip-planner">
          Trip Planner
        </NavLink>

        <NavLink to="/budget">
          Budget
        </NavLink>

        <NavLink to="/favorites">
          Favorites
        </NavLink>

        <NavLink to="/my-trips">
          My Trips
        </NavLink>

      </div>

    </nav>
  );
}

export default Navbar;