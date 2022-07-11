import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Table } from "react-bootstrap";

const AllUsersPage = () => {
  const users = useSelector((state) => state.allUsers);

  return (
    <div>
      <Table striped>
        <thead>
          <tr>
            <th>Users</th>
            <th> Blogs created </th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.map((user) => (
              <tr key={user.id}>
                <td>
                  <Link to={`/users/${user.id}`}>{user.name}</Link>
                </td>
                <td>{user.blogs.length}</td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
};

export default AllUsersPage;
