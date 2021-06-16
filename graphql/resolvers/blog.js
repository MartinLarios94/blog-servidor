const Blogs = require("../../models/blog");

module.exports = {
  blogs: async ({ sort, pagination }) => {
    try {
      const { limit, skip } = pagination || {};
      const total = await Blogs.count();
      const blogs = await Blogs.find()
        .sort(sort)
        .limit(limit)
        .skip(limit * skip);

      return {
        total,
        blogs,
      };
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
  createBlog: async (args, req) => {
    if (req.isAuth) {
      throw new Error("Unauthenticated");
    }
    const blog = new Blogs({
      Title: args.blogInput.Title,
      Excerpt: args.blogInput.Excerpt,
      Author: args.blogInput.Author,
      Tag: args.blogInput.Tag,
      Image: args.blogInput.Image,
      Views: args.blogInput.Views,
      Likes: args.blogInput.Likes,
    });
    try {
      const result = await blog.save();

      return {
        ...result._doc,
      };
    } catch (error) {
      throw error;
    }
  },
  updateBlog: async (args, req) => {
    try {
      if (!req.isAuth) {
        throw new Error("Unauthenticated");
      }
      const findBlog = await Blogs.findOne({ _id: args.blogInputUpdate._id });

      if (!findBlog) {
        throw new Error("Blog does not exists.");
      }

      findBlog.Title = args.blogInputUpdate.Title;
      findBlog.Excerpt = args.blogInputUpdate.Excerpt;
      findBlog.Author = args.blogInputUpdate.Author;
      findBlog.Tag = args.blogInputUpdate.Tag;

      const result = await findBlog.save();

      return {
        ...result._doc,
      };
    } catch (error) {
      throw error;
    }
  },
  deleteBlog: async (args, req) => {
    if (!req.isAuth) {
      throw new Error("Unauthenticated");
    }
    await Blogs.deleteOne({ _id: args.blogId });
    return "Blog succesfully deleted";
  },
};
