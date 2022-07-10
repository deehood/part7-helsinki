import FormInputBlog from "./FormInputBlog";
import Blog from "./Blog";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllBlogs,
  createBlog,
  setSelectorBlogs,
} from "../reducers/blogReducer";
import { setUser } from "../reducers/userReducer";

const Bloglist = () => {
  const [newPost, setNewPost] = useState(false);
  const dispatch = useDispatch();

  const blogs = useSelector(setSelectorBlogs());
  const user = useSelector((state) => state.user);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON);
      dispatch(setUser(JSON.parse(loggedUserJSON)));
      (!blogs || blogs.length === 0) && dispatch(getAllBlogs(loggedUser.token));
    }
  }, []);

  const handleCreateBlog = async (e, inputBlog) => {
    e.preventDefault();
    dispatch(createBlog(inputBlog, user.token));
    setNewPost(false);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", Width: "40rem" }}>
      <button
        style={{ width: "5rem" }}
        id="new-post-button"
        className={newPost ? "hideButton" : "showButton"}
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

      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};
export default Bloglist;
