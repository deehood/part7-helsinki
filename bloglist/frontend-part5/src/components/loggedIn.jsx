import { useSelector } from "react-redux";
import userService from "../services/users";
import { useState, useEffect } from "react";

const LoggedIn = ({ handleLogout }) => {
  const user = useSelector((state) => state.user);
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
        <div className="loggedUser"> {user.name} is logged in </div>
        <button id="logoutButton" onClick={handleLogout}>
          logout
        </button>
      </span>

      <div className="users">{users && users.length} users</div>
    </div>
  );
};

export default LoggedIn;
