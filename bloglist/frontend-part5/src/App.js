import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Notification from "./components/Notification";
import loginService from "./services/login";
import LoginForm from "./components/LoginForm";
import Bloglist from "./components/Bloglist";
import { setNotification } from "./reducers/notificationReducer";

const App = () => {
  // const [notification, setNotification] = useState(null);
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");
    if (loggedUserJSON) {
      setUser(JSON.parse(loggedUserJSON));
    }
  }, []);

  const handleLogin = async ({ username, password }) => {
    try {
      const userCred = await loginService.login({ username, password });
      setUser(userCred);
      await window.localStorage.setItem("loggedUser", JSON.stringify(userCred));
    } catch (exception) {
      dispatch(setNotification(exception.response.data.error, "error", 2));
    }
  };

  return (
    <>
      <div>
        <h2>Log in to application</h2>
        <Notification />
      </div>
      {!user ? (
        <LoginForm handleLogin={handleLogin} />
      ) : (
        <Bloglist user={user} />
      )}
    </>
  );
};

export default App;
