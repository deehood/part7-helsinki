import { useState } from "react";

const FormInputBlog = ({ setNewPost, handleCreateBlog }) => {
  const [inputBlog, setInputBlog] = useState({
    title: "",
    author: "",
    url: "",
  });

  return (
    <div className="createNewBlog">
      <h3>Create new Blog</h3>
      <form onSubmit={(e) => handleCreateBlog(e, inputBlog)}>
        title:
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
      </form>
    </div>
  );
};

export default FormInputBlog;
