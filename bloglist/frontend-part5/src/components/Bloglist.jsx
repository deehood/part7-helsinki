import FormInputBlog from "./FormInputBlog";
import Blog from "./Blog";
import blogService from "../services/blogs";
import helperService from "../services/helper";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setNotification } from "../reducers/notificationReducer";
import { getAllBlogs, setBlogs, updateBlog } from "../reducers/blogReducer";

const Bloglist = ({ user }) => {
  const [newPost, setNewPost] = useState(false);
  const dispatch = useDispatch();

  const blogs = useSelector((state) => state.blogs);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON);
      dispatch(getAllBlogs(loggedUser.token));
    }
  }, []);

  const handleLogout = () => {
    window.localStorage.removeItem("loggedUser");
    window.location.reload();
  };

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
    const newBlog = {
      user: blog.user.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url,
    };

    // await blogService.updateBlog(blog.id, newBlog, token);

    dispatch(updateBlog(blogs, blog.id, newBlog, token));

    //   // change the likes in blogs and sort
    //   const temp = [...blogs];
    //   const blogIndex = temp.findIndex((x) => x.id === blog.id);
    //   temp[blogIndex].likes = newBlog.likes;
    //   // dispatch(refreshBlogs([...temp]));
    //   dispatch(refreshBlogs(temp));
  };

  const handleCreateBlog = async (e, inputBlog) => {
    e.preventDefault();
    let blogPost = {};
    try {
      blogPost = await blogService.createBlog(inputBlog, user.token);

      // put user object (with name) back in blog
      blogPost.user = await blogService.getPosterNameById(
        blogPost.id,
        user.token
      );
    } catch (exception) {
      exception.response.data.error
        ? dispatch(setNotification(exception.response.data.error, "error", 2))
        : dispatch(setNotification(exception.response.statusText, "error", 2));

      return;
    }

    dispatch(setBlogs(helperService.sortBlogs(blogs.concat(blogPost))));
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
      <p>
        {user.name} logged in <button onClick={handleLogout}>logout</button>
      </p>
      <button id="new-post" onClick={() => setNewPost(true)}>
        new post{" "}
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
          username={user.username}
          token={user.token}
          handleLikes={handleLikes}
          handleRemoveBlog={handleRemoveBlog}
        />
      ))}
    </div>
  );
};
export default Bloglist;
