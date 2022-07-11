import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";

const UserPage = () => {
  const users = useSelector((state) => state.allUsers);

  const { id } = useParams();

  return users.map((user) =>
    user.id === id ? (
      <div key={user.id}>
        <h2>{user && user.name}</h2>
        <p style={{ marginTop: "1rem", marginBottom: "1rem" }}>
          <b>added blogs</b>
        </p>
        <ul>
          <Table>
            <tbody>
              {user &&
                user.blogs.map((blog) => (
                  <tr key={blog.id}>
                    <td>
                      <li style={{ marginLeft: "1rem" }}>
                        <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                      </li>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </ul>
      </div>
    ) : null
  );
};

export default UserPage;
