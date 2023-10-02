import React from "react";
import { useParams, useOutletContext } from "react-router-dom";

const SingleSubreddit = () => {
  const { subredditName } = useParams();
  const { subreddits, post } = useOutletContext();

  const selectedSubreddit = subreddits.find(
    (subreddit) => subreddit.name === subredditName
  );

  const postsForSubreddit = post.filter(
    (post) => post.subredditId === selectedSubreddit.id
  );

  return (
    <div className="post-container">
      <h2>Posts in {subredditName}</h2>
      <ul>
        {postsForSubreddit.map((post) => (
          <PostItem key={post.id} post={post} />
        ))}
      </ul>
    </div>
  );
};

const PostItem = ({ post }) => (
  <li>
    <h3>{post.title}</h3>
    <p>{post.text}</p>
  </li>
);
export default SingleSubreddit;
