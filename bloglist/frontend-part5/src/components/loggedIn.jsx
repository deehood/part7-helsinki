import { useSelector } from "react-redux";
import userService from "../services/users";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const handleLogout = () => {
  window.localStorage.removeItem("loggedUser");
  window.location.reload();
};

const LoggedIn = () => {
  const user = useSelector((state) => state.user);
  console.log(user);
  const [users, setUsers] = useState(null);

  useEffect(() => {
    const getData = async () => {
      setUsers(await userService.getAll());
    };
    getData();
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
