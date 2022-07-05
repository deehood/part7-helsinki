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
import UsersPage from "./components/AllUsersPage";
import UserPage from "./components/UserPage";
import helperService from "./services/helper";

const App = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");
    if (loggedUserJSON) {
      dispatch(setUser(JSON.parse(loggedUserJSON)));
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
    <Router>
      {!user && <h2>Log in to application</h2>}
      <Notification />
      {user && <LoggedIn handleLogout={helperService.handleLogout} />}
      <Routes>
        <Route
          path="/"
          element={
            !user ? <LoginForm handleLogin={handleLogin} /> : <Bloglist />
          }
        />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/users/:id" element={<UserPage />} />
      </Routes>
    </Router>
  );
};

export default App;
