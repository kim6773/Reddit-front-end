import React from "react";
import { Link } from "react-router-dom";
import { BsReddit } from "react-icons/bs";
import { HiHome } from "react-icons/hi";

const Navbar = ({ user, setToken, setUser }) => {
  const handleLogout = () => {
    setToken("");
    setUser({});
    localStorage.removeItem("token");
  };

  return (
    <nav className="nav-bar">
      <div id="left">
        <div className="reddit-logo">
          <BsReddit />
        </div>

        {user && user.id ? (
          <>
            <Link to={"/"} onClick={handleLogout}>
              Logout
            </Link>
            <Link to={"/"} className="home-link">
              <HiHome className="home-icon" />
            </Link>
            <Link to={"/subreddit"}>Subreddit</Link>
            <span>Welcome {user.username}</span>
          </>
        ) : (
          <>
            <Link to={"/register"}>Register</Link>
            <Link to={"/login"}>Login</Link>
          </>
        )}
      </div>
      <div className="search">
        <form className="search-container">
          <input type="text" placeholder="Search" />
          <button type="submit">Search</button>
        </form>
      </div>
    </nav>
  );
};

export default Navbar;
