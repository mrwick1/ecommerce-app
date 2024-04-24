import React from "react";
import { Link } from "react-router-dom";
import "./Header.scss";
import { useUser } from "../../context/UserContext";

const Header: React.FC = () => {
  const { user, logout } = useUser();

  return (
    <header className="header">
      <h1>Amazon</h1>
      <div className="nav-links">
        {user ? (
          <>
            <Link to="/">Home</Link>
            <Link to="/profile">Profile</Link>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
