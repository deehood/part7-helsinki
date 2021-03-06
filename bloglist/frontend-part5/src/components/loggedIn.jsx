import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getAllUsers } from "../reducers/allUsersReducer";
import { Button } from "react-bootstrap";

const handleLogout = (navigate) => {
  navigate("/");
  window.localStorage.removeItem("loggedUser");
  window.location.reload();
};

const LoggedIn = () => {
  const navigate = useNavigate();
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
      <h2 className="title">Blog App</h2>
      <span className="logged">
        <div className="loggedUser">
          <Link to={`/users/${user.id}`}> {user.name}</Link> is logged in{" "}
        </div>
        <Button
          size="sm"
          id="logoutButton"
          onClick={() => handleLogout(navigate)}
        >
          logout
        </Button>
      </span>
      <div className="main blue">
        <Link to="/">Main</Link>
      </div>
      <div className="users white">
        <Link to="/users">{users && users.length} users</Link>
      </div>
    </div>
  );
};

export default LoggedIn;
