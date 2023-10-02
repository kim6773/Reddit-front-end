import React, { useState } from "react";
import API from "../assets/API";
import { useOutletContext } from "react-router-dom";

const Subreddit = () => {
  const [formState, setFormState] = useState({ name: "" });
  const [error, setError] = useState("");
  const { token } = useOutletContext();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API}/subreddits`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formState),
      });
      const data = await response.json();

      if (data.success) {
        setFormState({ name: "" });
        console.log(data);
      } else if (data.error) {
        setError(data.error);
      }
    } catch (error) {
      setError("An error occurred while creating the subreddit.");
    }
  };

  const handleChange = (e) => {
    const name = e.target.name;
    setFormState({ ...formState, [name]: e.target.value });
  };

  return (
    <>
      <form className="entire-form" onSubmit={handleFormSubmit}>
        <div className="form-container">
          <label>Subreddit Name:</label>
          <p>
            <input
              className="input"
              placeholder="Enter Name"
              name="name"
              type="text"
              id="name"
              value={formState.name}
              onChange={handleChange}
            />
          </p>
        </div>
        <p>{error}</p>
        <button type="submit">Create Subreddit</button>
      </form>
    </>
  );
};

export default Subreddit;
