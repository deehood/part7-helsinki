import FormInputBlog from "./FormInputBlog";
import Blog from "./Blog";
import blogService from "../services/blogs";
import helperService from "../services/helper";
import { useState, useEffect } from "react";

const Bloglist = ({ user, handleNotification }) => {
  const [newPost, setNewPost] = useState(false);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON);
      blogService
        .getAll(loggedUser.token)
        .then((data) => setBlogs(helperService.sortBlogs([...data])));
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
      setBlogs(blogs.filter((x) => x.id !== blog.id));
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

    await blogService.updateBlog(blog.id, newBlog, token);

    // change the likes in blogs and sort
    const temp = [...blogs];
    const blogIndex = temp.findIndex((x) => x.id === blog.id);
    temp[blogIndex].likes = newBlog.likes;
    setBlogs(helperService.sortBlogs([...temp]));
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
        ? handleNotification(exception.response.data.error, "error")
        : handleNotification(exception.response.statusText, "error");

      return;
    }

    setBlogs(helperService.sortBlogs(blogs.concat(blogPost)));
    await handleNotification(`${inputBlog.title} by ${inputBlog.author}`);
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
