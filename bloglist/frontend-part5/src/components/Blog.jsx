import { useState } from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { incrementLikes, deleteBlog } from "../reducers/blogReducer";
import { Link } from "react-router-dom";
const Blog = ({ blog }) => {
  const [viewStatus, setViewStatus] = useState("view");
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleLikes = () => {
    dispatch(incrementLikes(blog, user.token));
  };

  const handleRemoveBlog = () => {
    if (window.confirm(`remove blog - ${blog.title} by ${blog.author}`)) {
      dispatch(deleteBlog(blog.id, user.token));
    }
  };

  const toggle = () =>
    viewStatus === "view" ? setViewStatus("hide") : setViewStatus("view");

  const blogStyle = {
    justifyContents: "center",

    overflow: "hidden",
    padding: 5,
    paddingRight: 10,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <div className="blogLine" style={blogStyle}>
      <Link to={`/blogs/${blog.id}`}>
        {blog.title} - {blog.author}
      </Link>
      <button className="button-toggleView" onClick={() => toggle(viewStatus)}>
        {viewStatus}
      </button>
      {viewStatus === "hide" && (
        <div className="innerBlogLine">
          {blog.url}
          <br />
          likes {blog.likes}{" "}
          <button id="button-like" onClick={handleLikes}>
            like
          </button>
          <br />
          {blog.user.name}
          <br />
          {user.username === blog.user.username && (
            <button id="button-remove" onClick={handleRemoveBlog}>
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
};

export default Blog;
