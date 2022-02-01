import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { Link, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../js/action/authAction";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(loginUser({ email, password }));
  };
  const { isAuth, isLoading, error } = useSelector(
    (state) => state.authReducer
  );

  return (
    <div>
      {isLoading ? (
        <h1>Loading......</h1>
      ) : isAuth ? (
        <Navigate to="/profile" />
      ) : (
        <Form className="col-md-7" onSubmit={handleSubmit}>
          {error && error.id === "login" && (
            <Alert variant="danger">{error && error.msg}</Alert>
          )}
          <h1>Login</h1>
          <Form.Group className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
          <Link to="/register">Register here</Link>
        </Form>
      )}
    </div>
  );
};

export default Login;