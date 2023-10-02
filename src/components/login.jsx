import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import API from "../assets/API";

const Login = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const history = useHistory();

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API}/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        const { token } = data;
        localStorage.setItem("token", token);
        history.push("/");
      } else {
        setError(data.error);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <form className="entire-form" onSubmit={handleFormSubmit}>
      <div className="form-container">
        <label>Username: </label>
        <input
          className="input"
          placeholder="Enter Username"
          name="username"
          type="text"
          onChange={handleChange}
        />
      </div>
      <div className="form-container">
        <label>Password: </label>
        <input
          className="input"
          placeholder="Enter Password"
          name="password"
          type="password"
          onChange={handleChange}
        />
      </div>
      <button type="submit">Submit</button>
      {error && <p>{error}</p>}
    </form>
  );
};

export default Login;
