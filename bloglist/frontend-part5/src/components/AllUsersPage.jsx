import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const AllUsersPage = () => {
  const users = useSelector((state) => state.allUsers);

  return (
    <div className="usersGrid">
      <span className="userTitle">Users</span>
      <span className="title2">Blogs created</span>

      {users &&
        users.map((user) => (
          <div key={user.id} className="lineWrap">
            <Link to={`/users/${user.id}`}>
              <span className="userName">{user.name} </span>
            </Link>
            <span className="blogNumber">{user.blogs.length}</span>
          </div>
        ))}
    </div>
  );
};

export default AllUsersPage;
