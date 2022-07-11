import { useState } from "react";
import { Form, Button } from "react-bootstrap";

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
        <Form.Group controlId="title">
          <Form.Label className="mt-3 ">title</Form.Label>
          <Form.Control
            type="text"
            placeholder="title..."
            style={{ maxWidth: "25rem", width: "70%" }}
            className="mb-2 "
            value={inputBlog.title}
            name="title"
            onChange={(e) =>
              setInputBlog({ ...inputBlog, [e.target.name]: e.target.value })
            }
          />
        </Form.Group>
        <Form.Group controlId="author">
          <Form.Label>author</Form.Label>
          <Form.Control
            type="text"
            placeholder="author..."
            style={{ maxWidth: "25rem", width: "70%" }}
            className="mb-2  "
            value={inputBlog.author}
            name="author"
            onChange={(e) =>
              setInputBlog({ ...inputBlog, [e.target.name]: e.target.value })
            }
          />
        </Form.Group>
        <Form.Group controlId="url">
          <Form.Label>url</Form.Label>
          <Form.Control
            type="text"
            placeholder="url..."
            style={{ maxWidth: "25rem", width: "70%" }}
            className="mb-4  "
            name="url"
            onChange={(e) =>
              setInputBlog({ ...inputBlog, [e.target.name]: e.target.value })
            }
          />
        </Form.Group>

        <Button style={{ marginRight: "0.3rem" }} size="sm" type="submit">
          create
        </Button>
        <Button
          size="sm"
          onClick={() => {
            setNewPost(false);
            setInputBlog({ title: "", author: "", url: "" });
          }}
        >
          cancel
        </Button>
      </Form>

      {/* <Form onSubmit={(e) => handleCreateBlog(e, inputBlog)}>
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
      </Form> */}
    </div>
  );
};

export default FormInputBlog;
