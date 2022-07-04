import { useSelector } from "react-redux";
const LoggedIn = ({ handleLogout }) => {
  const user = useSelector((state) => state.user);
  return (
    <div className="loggedGridContainer">
      <h2 className="title"> Welcome to Blogs</h2>
      <span className="logged">
        <div className="loggedUser"> {user.name} is logged in </div>
        <button id="logoutButton" onClick={handleLogout}>
          logout
        </button>
      </span>

      {/* {//TODO users} */}
      <div className="users">2 users</div>
    </div>
  );
};

export default LoggedIn;
