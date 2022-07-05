import { useEffect, useState } from "react";
import userService from "../services/users";
import { Link } from "react-router-dom";
// import User from "../components/User";
const UsersPage = () => {
  const [users, setUsers] = useState(null);

  useEffect(() => {
    const getData = async () => {
      setUsers(await userService.getAll());
    };
    getData();
  }, []);
  return (
    <div className="usersGrid">
      <span className="userTitle">Users</span>
      <span className="title2">Blogs created</span>
      {users &&
        users.map((user) => (
          <div key={user.id}>
            <a className="userName">
              <Link to={`/${user.id}`}>{user.name}</Link>
            </a>
            <span className="blogNumber">{user.blogs.length}</span>
          </div>
        ))}
      {/* <Routes><Route path="/users/:id" element={<User />} /></Routes> */}
    </div>
  );
};

export default UsersPage;
