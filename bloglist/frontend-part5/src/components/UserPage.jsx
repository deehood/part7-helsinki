import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import userService from "../services/users";
import { useState, useEffect } from "react";

const User = () => {
  const token = useSelector((state) => state.user.token);
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      const result = await userService.getUserById(id, token);
      setUser(result);
    };
    getUser();
  }, []);
  return (
    <>
      <h2>{user && user.name}</h2>
      <p style={{ marginTop: "1rem", marginBottom: "1rem" }}>
        <b>added blogs</b>
      </p>
      <ul>
        {user &&
          user.blogs.map((blog) => (
            <li key={blog.id} style={{ marginLeft: "1rem" }}>
              {blog.title}
            </li>
          ))}
      </ul>
    </>
  );
};

export default User;
