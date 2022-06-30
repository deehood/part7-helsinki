import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import Bloglist from "./components/Bloglist";
import { setNotification } from "./reducers/notificationReducer";
import { setUser } from "./reducers/userReducer";
import loginService from "./services/login";

const App = () => {
  // const [notification, setNotification] = useState(null);
  // const [user, setUser] = useState(null);
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
    <>
      <div>
        <h2>Log in to application</h2>
        <Notification />
      </div>
      {!user ? <LoginForm handleLogin={handleLogin} /> : <Bloglist />}
    </>
  );
};

export default App;
