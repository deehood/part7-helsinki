import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import Bloglist from "./components/Bloglist";
import { setNotification } from "./reducers/notificationReducer";
import { setUser } from "./reducers/userReducer";
import loginService from "./services/login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoggedIn from "./components/loggedIn";
import AllUsersPage from "./components/AllUsersPage";
import UserPage from "./components/UserPage";
import BlogPage from "./components/BlogPage";
import { getAllBlogs } from "./reducers/blogReducer";
import { getAllUsers } from "./reducers/allUsersReducer";

const App = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  const users = useSelector((state) => state.allUsers);
  const blogs = useSelector((state) => state.blogs);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");
    if (loggedUserJSON) {
      dispatch(setUser(JSON.parse(loggedUserJSON)));
      const loggedUser = JSON.parse(loggedUserJSON);
      (!users || users === 0) && dispatch(getAllUsers(loggedUser.token));
      (!blogs || blogs === 0) && dispatch(getAllBlogs(loggedUser.token));
    }
  }, []);

  const handleLogin = async ({ username, password }) => {
    try {
      const userCred = await loginService.login({ username, password });

      dispatch(setUser(userCred));

      await window.localStorage.setItem("loggedUser", JSON.stringify(userCred));
    } catch (exception) {
      dispatch(setNotification(exception.response.data.error, "error", 2));
    }
  };

  return (
    <div className="container">
      <Router>
        {!user && <h2>Log in to application</h2>}
        <Notification />
        {user && <LoggedIn />}
        <Routes>
          <Route
            path="/"
            element={
              !user ? <LoginForm handleLogin={handleLogin} /> : <Bloglist />
            }
          />
          <Route path="/users" element={<AllUsersPage />} />
          <Route path="/users/:id" element={<UserPage />} />
          <Route path="/blogs/:id" element={<BlogPage />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
