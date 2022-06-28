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
  const updatedBlog = request.body;

  const result = await Blog.findByIdAndUpdate(request.params.id, updatedBlog, {
    new: true,
  });
  response.status(204).send(result);
});

blogRouter.post("/", async (request, response) => {
  const user = request.user;

  const blog = await Blog(request.body);
  const blogJson = await blog.toJSON();
  // defaults to 0 if not present
  if (!("likes" in blogJson)) blog["likes"] = 0;

  // sends 400 status if both url and title not present

  if (!blogJson.title && !blogJson.url) {
    response.status(400).end();
    return;
  }

  // Save user id in blog db
  // let user = await User.findById(decodedToken.id);
  user && (blog.user = user._id);
  await blog.save();

  // save blog id in user db
  if (user) {
    user.blogs.push(blog._id);
    await user.save();
  }

  response.status(201).json(blog);
});

module.exports = blogRouter;
