import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
// import blogService from "../services/blogs";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { incrementLikes, setSelectorBlogs } from "../reducers/blogReducer";
import { getAllBlogs } from "../reducers/blogReducer";

const BlogPage = () => {
  const token = useSelector((state) => state.user.token);
  const { id } = useParams();
  const blogs = useSelector(setSelectorBlogs());
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllBlogs(token));
  }, [token]);

  const blog = blogs.find((blog) => blog.id === id);

  const handleLikes = () => {
    dispatch(incrementLikes(blog, token));
  };
  return (
    <>
      {blog && (
        <div>
          <h2> {blog.title}</h2>
          <Link to={""}>{blog.url}</Link>
          <p>
            {" "}
            {blog.likes} likes{" "}
            <button id="button-like" onClick={handleLikes}>
              like
            </button>
          </p>
          <p>
            added by{" "}
            <Link to={`/users/${blog.user.id}`}> {blog.user.name}</Link>
          </p>
        </div>
      )}
    </>
  );
};

export default BlogPage;
