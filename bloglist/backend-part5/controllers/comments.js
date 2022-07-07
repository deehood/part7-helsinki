const commentRouter = require("express").Router();
const Comments = require("../models/blog");

// takes id
commentRouter.get("/:id", async (request, response) => {
  const comments = await Comments.findById(request.params.id);
  response.json(comments);
});
// takes id
commentRouter.delete("/:id", async (request, response) => {
  await Comments.findByIdAndRemove(request.params.id);

  response.status(204).end();
});
// takes  object {id:blog_id,comment}
commentRouter.put("/", async (request, response) => {
  const result = await Comments.findByIdAndUpdate(
    request.params.id,
    request.body,
    {
      new: true,
    }
  );

  response.json(result).status(201);
});

module.exports = commentRouter;
