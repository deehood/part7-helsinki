import { useState } from "react";
import { useSelector } from "react-redux";

import PropTypes from "prop-types";

const Blog = ({ blog, handleLikes, handleRemoveBlog }) => {
  const [viewStatus, setViewStatus] = useState("view");

  const user = useSelector((state) => state.user);

  const toggle = () =>
    viewStatus === "view" ? setViewStatus("hide") : setViewStatus("view");

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <div className="blogLine" style={blogStyle}>
      {blog.title} - {blog.author}{" "}
      <button id="button-toggleView" onClick={() => toggle(viewStatus)}>
        {viewStatus}
      </button>
      {viewStatus === "hide" && (
        <div className="innerBlogLine">
          {blog.url}
          <br />
          likes {blog.likes}{" "}
          <button
            id="button-like"
            onClick={() => handleLikes(blog, user.token)}
          >
            like
          </button>
          <br />
          {blog.user.name}
          <br />
          {user.username === blog.user.username && (
            <button
              id="button-remove"
              onClick={() => handleRemoveBlog(blog, user.token)}
            >
              remove
            </button>
          )}
        </div>
      )}
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  handleLikes: PropTypes.func.isRequired,
  handleRemoveBlog: PropTypes.func.isRequired,
};

export default Blog;
