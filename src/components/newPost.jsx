import React from "react";
import { useOutletContext } from "react-router-dom";
import { BiDownvote, BiUpvote } from "react-icons/bi";
import API from "../assets/API";

const NewPost = () => {
  const { post, token, fetchPost, user } = useOutletContext();

  const handleVote = async (postId, isUpvote) => {
    const postToUpdate = post.find((p) => p.id === postId);

    if (!postToUpdate) {
      console.error("Post not found");
      return;
    }

    const endpoint = isUpvote ? "upvotes" : "downvotes";

    const response = await fetch(`${API}/votes/${endpoint}/${postId}`, {
      method: isUpvote ? "POST" : "DELETE",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        postId: postToUpdate.id,
      }),
    });

    const data = await response.json();
    console.log(data);
    fetchPost();
  };

  return (
    <div className="post-container">
      {post.map((posts) => (
        <div className="reddit-post" key={posts.id}>
          <div className="post-header">
            <p className="subreddit">
              {posts.subreddit.name}/ {posts.user.username}
            </p>
          </div>
          <div className="display-likes">
            <div className="like-buttons">
              <div className="upVote">
                <button
                  onClick={() => handleVote(posts.id, true)}
                  className="icon-button"
                >
                  <BiUpvote />
                </button>
              </div>
              <div className="downVote">
                <button
                  onClick={() => handleVote(posts.id, false)}
                  className="icon-button"
                >
                  <BiDownvote />
                </button>
              </div>
            </div>
            Likes: {posts.upvotes.length - posts.downvotes.length}
          </div>
          <h2 className="post-title">{posts.title}</h2>
          <p className="post-text">{posts.text}</p>
        </div>
      ))}
    </div>
  );
};

export default NewPost;
