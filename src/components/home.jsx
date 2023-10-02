import React from "react";
import { Link } from "react-router-dom";
import NewPost from "./newPost";
import NewSubreddit from "./newSubreddit";

const Home = () => {
  return (
    <div className="home-container">
      <div className="subreddits-container">
        <NewSubreddit />
      </div>
      <div className="create-post">
        <Link to="/post">
          <button className="button-create">+ Create Post</button>
        </Link>
      </div>
      <NewPost />
    </div>
  );
};

export default Home;
