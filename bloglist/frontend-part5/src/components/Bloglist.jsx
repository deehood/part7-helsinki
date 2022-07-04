import FormInputBlog from "./FormInputBlog";
import Blog from "./Blog";
import blogService from "../services/blogs";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setNotification } from "../reducers/notificationReducer";
import {
  getAllBlogs,
  setBlogs,
  updateBlog,
  setSelectorBlogs,
} from "../reducers/blogReducer";

const Bloglist = () => {
  const [newPost, setNewPost] = useState(false);
  const dispatch = useDispatch();

  const blogs = useSelector(setSelectorBlogs());
  const user = useSelector((state) => state.user);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON);
      dispatch(getAllBlogs(loggedUser.token));
    }
  }, []);

  const handleRemoveBlog = async (blog, token) => {
    if (window.confirm(`remove blog - ${blog.title} by ${blog.author}`)) {
      try {
        await blogService.removeBlog(blog.id, token);
      } catch (exception) {
        return;
      }
      dispatch(setBlogs(blogs.filter((x) => x.id !== blog.id)));
    }
  };

  const handleLikes = async (blog, token) => {
    const newBlog = { ...blog, user: blog.user.id, likes: blog.likes + 1 };

    dispatch(updateBlog(blogs, blog.id, newBlog, token));
  };

  const handleCreateBlog = async (e, inputBlog) => {
    e.preventDefault();
    let blogPost = {};
    try {
      blogPost = await blogService.createBlog(inputBlog, user.token);
    } catch (exception) {
      exception.response.data.error
        ? dispatch(setNotification(exception.response.data.error, "error", 2))
        : dispatch(setNotification(exception.response.statusText, "error", 2));
      // return so it doesn't continue executing
      return;
    }

    dispatch(setBlogs(blogs.concat(blogPost)));
    dispatch(
      setNotification(
        `Added ${inputBlog.title} by ${inputBlog.author}`,
        "normal",
        2
      )
    );

    setNewPost(false);
  };

  return (
    <div>
      <button
        id="new-post-button"
        className={newPost ? "hideButton" : "shoButton"}
        onClick={() => setNewPost(true)}
      >
        new post
      </button>

      {newPost && (
        <FormInputBlog
          setNewPost={setNewPost}
          handleCreateBlog={handleCreateBlog}
        />
      )}
      <br />
      <br />
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          handleLikes={handleLikes}
          handleRemoveBlog={handleRemoveBlog}
        />
      ))}
    </div>
  );
};
export default Bloglist;
