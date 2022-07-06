const bcrypt = require("bcrypt");
const userRouter = require("express").Router();
const User = require("../models/user");
const Blog = require("../models/blog");

userRouter.get("/", async (request, response) => {
  const users = await User.find({}).populate("blogs", {
    title: 1,
    author: 1,
    url: 1,
    likes: 1,
  });

  response.json(users);
});

userRouter.get("/:id", async (request, response) => {
  const user = await User.findById(request.params.id).populate("blogs", {
    title: 1,
    author: 1,
    url: 1,
    likes: 1,
  });
  response.json(user);
});

userRouter.post("/", async (request, response) => {
  const { username, name, password } = request.body;

  if (!username || !password) {
    response.status(401).send("Username and Password must be filled");
    return;
  }

  if (username.length < 3 || password.length < 3) {
    response
      .status(402)
      .send("Username and Password must have at least 3 characters");
    return;
  }

  const users = await User.find({ username });

  if (users.length > 0) {
    response.status(403).send("Username already exists");
    return;
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const getBlogs = async () => {
    const blogs = await Blog.find({});
    return blogs;
  };

  let blogs = await getBlogs();

  const user = new User({
    username,
    name,
    passwordHash,
    blogs,
  });
  const savedUser = await user.save();

  response.status(201).json(savedUser);
});

module.exports = userRouter;
