import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { incrementLikes, setSelectorBlogs } from "../reducers/blogReducer";
import { useEffect } from "react";
import { getAllBlogs } from "../reducers/blogReducer";
import webUrl from "../utils/regex-weburl";

const BlogPage = () => {
  // const navigate = useNavigate;
  const token = useSelector((state) => state.user.token);
  const { id } = useParams();
  const blogs = useSelector(setSelectorBlogs());
  const dispatch = useDispatch();

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON);
      // only load from DB if necessary
      (!blogs || blogs.length === 0) && dispatch(getAllBlogs(loggedUser.token));
    }
  }, []);

  const handleLikes = () => {
    const blog = blogs.find((blog) => blog.id === id);
    dispatch(incrementLikes(blog, token));
  };
  return (
    <>
      {blogs &&
        blogs.map((blog) =>
          blog.id === id ? (
            <div key={blog.id}>
              <h2> {blog.title}</h2>
              {/* matches url regex */}
              {webUrl.test(blog.url) ? (
                // adds https if valid url without http
                blog.url.indexOf("http") === 0 ? (
                  <a href={`${blog.url}`} target="_blank" rel="noreferrer">
                    {blog.url}
                  </a>
                ) : (
                  <a
                    href={`https://${blog.url}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {blog.url}
                  </a>
                )
              ) : (
                <span>
                  {blog.url}
                  <span style={{ color: "darkred", marginLeft: "1rem" }}>
                    (non valid url)
                  </span>
                </span>
              )}
              <p>
                {blog.likes} likes{" "}
                <button id="button-like" onClick={handleLikes}>
                  like
                </button>
              </p>
              <p>
                added by{" "}
                <Link to={`/users/${blog.user.id}`}> {blog.user.name}</Link>
              </p>
              <h3 style={{ marginTop: "1rem" }}>Comments</h3>
              <ul>
                {blog.comments &&
                  blog.comments.map((comment) => (
                    <li key={comment} style={{ marginLeft: "1rem" }}>
                      {comment}
                    </li>
                  ))}
              </ul>
            </div>
          ) : null
        )}
    </>
  );
};

export default BlogPage;
