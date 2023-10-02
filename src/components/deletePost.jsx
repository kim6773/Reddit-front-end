import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import API from "../assets/API";

const DeletePost = () => {
  const { postId } = useParams();
  const { token, fetchPosts, userId } = useOutletContext();
  const navigate = useNavigate();

  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const handleDeletePost = async () => {
      setIsDeleting(true);
      setError("");

      try {
        const res = await fetch(`${API}/posts/${postId}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const info = await res.json();
        if (!info.success) {
          setError("An error occurred while deleting the post.");
        } else {
          fetchPosts();
          navigate("/");
        }
      } catch (error) {
        setError("An error occurred while deleting the post.");
      }

      setIsDeleting(false);
    };

    const post = fetchPosts.find((post) => post.id === postId);
    if (!post || userId !== post.userId) {
      navigate("/");
    } else {
      handleDeletePost();
    }
  }, [postId, token, userId, navigate, fetchPosts]);

  return (
    <div>
      <h1>Delete Post</h1>
      {isDeleting && <p>Deleting...</p>}
      {error && (
        <div>
          <p>{error}</p>
          <button
            onClick={() => {
              navigate("/");
            }}
          >
            Back to Home
          </button>
        </div>
      )}
    </div>
  );
};

export default DeletePost;
