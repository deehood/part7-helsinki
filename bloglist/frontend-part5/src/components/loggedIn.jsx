import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { getAllUsers } from "../reducers/allUsersReducer";

const handleLogout = () => {
  window.localStorage.removeItem("loggedUser");
  window.location.reload();
};

const LoggedIn = () => {
  const user = useSelector((state) => state.user);
  const users = useSelector((state) => state.allUsers);

  const dispatch = useDispatch();

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON);
      (!users || users.length === 0) && dispatch(getAllUsers(loggedUser.token));
    }
  }, []);

  return (
    <div className="loggedGridContainer">
      <h2 className="title"> Welcome to Blogs</h2>
      <span className="logged">
        <div className="loggedUser">
          <Link to={`/users/${user.id}`}> {user.name}</Link> is logged in{" "}
        </div>
        <button id="logoutButton" onClick={handleLogout}>
          logout
        </button>
      </span>
      <b className="main">
        <Link to="/">Main</Link>
      </b>
      <div className="users">
        <Link to="/users">{users && users.length} users</Link>
      </div>
    </div>
  );
};

export default LoggedIn;
