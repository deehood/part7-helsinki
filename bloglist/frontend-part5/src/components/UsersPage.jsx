import { useEffect, useState } from "react";
import userService from "../services/users";

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
            <span className="userName">{user.name}</span>
            <span className="blogNumber">{user.blogs.length}</span>
          </div>
        ))}
    </div>
  );
};

export default UsersPage;
