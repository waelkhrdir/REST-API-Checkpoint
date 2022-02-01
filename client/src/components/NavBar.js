import React from "react";
import { Navbar } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logoutUser } from "../js/action/authAction";

const NavBar = () => {
  const { isAuth } = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();
  return (
    <div>
      <Navbar bg="dark">
        <Navbar.Brand href="#home">
          <img
            src="https://raw.githubusercontent.com/shahzaibkhalid/mern-app-generator/master/static/logo.png"
            width="60"
            className="d-inline-block align-top"
            alt="React Bootstrap logo"
          />
        </Navbar.Brand>
        <Link to="/" className="nav-link">
          Home
        </Link>
        {isAuth ? (
          <Link to="/profile" className="nav-link">
            Profile
          </Link>
        ) : null}
        {isAuth ? (
          <Link
            to="/"
            className="nav-link"
            onClick={() => dispatch(logoutUser())}
          >
            Logout
          </Link>
        ) : (
          <Link to="/login" className="nav-link">
            Login
          </Link>
        )}
      </Navbar>
    </div>
  );
};

export default NavBar;