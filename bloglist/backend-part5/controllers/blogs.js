const blogRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");

blogRouter.get("/", async (request, response) => {
  //express-async-errors is taking care of try catch
  const blogs = await Blog.find({}).populate("user", {
    username: 1,
    name: 1,
  });

  response.json(blogs);
});

blogRouter.get("/:id", async (request, response) => {
  const blogs = await Blog.findById(request.params.id).populate("user", {
    username: 1,
    name: 1,
  });
  response.json(blogs);
});

blogRouter.delete("/:id", async (request, response) => {
  const user = request.user;

  const blog = await Blog.findById(request.params.id);

  if (blog) {
    if (blog.user.toString() === user._id.toString()) {
      //delete blog
      await Blog.findByIdAndRemove(request.params.id);

      // delete blog in user blogs

      const newUserBlogs = await user.blogs.filter(
        (x) => x.toString() !== request.params.id
      );

      await User.findByIdAndUpdate(user._id.toString(), {
        blogs: newUserBlogs,
      });
      response.status(204).end();
    } else response.status(401).json({ error: "invalid deletion" });
  } else response.status(401).send({ error: "Not found" });
});

blogRouter.put("/:id", async (request, response) => {
  const result = await Blog.findById(request.params.id).populate("user", {
    username: 1,
    name: 1,
  });
  result.likes++;

  await result.save();
  response.json(result);
});

blogRouter.post("/", async (request, response) => {
  const user = request.user;
  const blog = await Blog({
    ...request.body,
    user: user.id,
    likes: 0,
  }).populate("user", {
    username: 1,
    name: 1,
  });

  // sends 400 status if both url and title not present

  if (!blog.title && !blog.url) {
    response.status(400).end();
    return;
  }

  // Save user id in blog db
  // let user = await User.findById(decodedToken.id);
  // user && (blog.user = user._id);
  await blog.save();

  // save blog id in user db
  if (user) {
    user.blogs.push(blog._id);
    await user.save();
  }

  response.status(201).json(blog);
});

module.exports = blogRouter;
