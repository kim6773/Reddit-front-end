import React, { useState } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import API from "../assets/API";

const CreatePost = () => {
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");
  const [subredditId, setSubredditId] = useState("");
  const { token, subreddits, fetchPost } = useOutletContext();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "title") setTitle(value);
    else if (name === "text") setText(value);
  };

  const handleSubredditChange = (e) => {
    setSubredditId(e.target.value);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API}/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          text,
          title,
          subredditId,
        }),
      });

      const data = await response.json();

      if (data.success) {
        console.log(data);
        navigate(`/`);
        fetchPost();
      } else if (data.error) {
        setError(data.error);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <div>
      <form className="entire-form" onSubmit={handleFormSubmit}>
        <div className="form-container">
          <label>Create Title</label>
          <input
            className="input"
            placeholder="Enter title"
            name="title"
            type="text"
            value={title}
            onChange={handleInputChange}
          />
          <label>Create Text</label>
          <input
            className="input"
            placeholder="Enter text"
            name="text"
            type="text"
            value={text}
            onChange={handleInputChange}
          />
        </div>
        <div className="subreddit-list">
          <label>Select Subreddit</label>
          <select onChange={handleSubredditChange}>
            <option value="">Select a subreddit</option>
            {subreddits &&
              subreddits.map((subreddit) => (
                <option key={subreddit.id} value={subreddit.id}>
                  {subreddit.name}
                </option>
              ))}
          </select>
        </div>
        <p>{error}</p>
        <button type="submit">Create Post</button>
      </form>
    </div>
  );
};

export default CreatePost;
