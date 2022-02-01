import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { Link, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../js/action/authAction";
const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(registerUser({ name, phone, email, password }));
  };

  const { isAuth, isLoading, error } = useSelector(
    (state) => state.authReducer
  );

  return (
    <div>
      {isLoading ? (
        <h1>Loding ...</h1>
      ) : isAuth ? (
        <Navigate to="/profile" />
      ) : (
        <Form className="col-md-7" onSubmit={handleSubmit}>
          {error && error.id === "register" && (
            <Alert variant="danger">{error && error.msg}</Alert>
          )}
          <h1>Register</h1>

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

          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="text"
              placeholder="Name"
              onChange={(e) => setPhone(e.target.value)}
              value={phone}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
          <Link to="/login">Login here</Link>
        </Form>
      )}
    </div>
  );
};

export default Register;