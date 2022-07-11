import { useState } from "react";
import { Form } from "react-bootstrap";

const FormInputBlog = ({ setNewPost, handleCreateBlog }) => {
  const [inputBlog, setInputBlog] = useState({
    title: "",
    author: "",
    url: "",
  });

  return (
    <div className="createNewBlog">
      <h3>Create new Blog</h3>
      <Form onSubmit={(e) => handleCreateBlog(e, inputBlog)}>
        <Form.Group>
          <Form.Label> title:</Form.Label>
          <input
            id="title"
            value={inputBlog.title}
            name="title"
            onChange={(e) =>
              setInputBlog({ ...inputBlog, [e.target.name]: e.target.value })
            }
            autoComplete="off"
            type="text"
          ></input>
          <br />
          author:
          <input
            id="author"
            value={inputBlog.author}
            name="author"
            onChange={(e) =>
              setInputBlog({ ...inputBlog, [e.target.name]: e.target.value })
            }
            autoComplete="off"
            type="text"
          ></input>
          <br />
          url:
          <input
            id="url"
            value={inputBlog.url}
            name="url"
            onChange={(e) =>
              setInputBlog({ ...inputBlog, [e.target.name]: e.target.value })
            }
            autoComplete="off"
            type="text"
          ></input>
          <br />
          <button id="button-create"> create</button>
          <button
            onClick={() => {
              setNewPost(false);
              setInputBlog({ title: "", author: "", url: "" });
            }}
          >
            cancel
          </button>
        </Form.Group>
      </Form>
    </div>
  );
};

export default FormInputBlog;
