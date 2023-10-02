import React, { useState } from "react";
import API from "../assets/API";
import { useOutletContext, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [formState, setFormState] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const { setToken } = useOutletContext();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API}/users/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formState),
      });

      const data = await response.json();

      if (data.error) {
        setError(data.error);
      } else {
        setToken(data.token);
        localStorage.setItem("token", data.token);
        navigate("/");
      }
    } catch (err) {
      setError("An error occurred while processing your request.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <form className="entire-form" onSubmit={handleFormSubmit}>
      <div className="form-container">
        <label>Username:</label>
        <p>
          <input
            className="input"
            placeholder="Enter Username"
            name="username"
            type="text"
            id="username"
            onChange={handleChange}
          />
        </p>
      </div>
      <div className="form-container">
        <label>Password:</label>
        <p>
          <input
            className="input"
            placeholder="Enter Password"
            name="password"
            type="password"
            id="password"
            onChange={handleChange}
          />
        </p>
        <button type="submit">Submit</button>
        <p>{error}</p>
      </div>
    </form>
  );
};
export default Register;
