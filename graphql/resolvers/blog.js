const Blogs = require('../../models/blog')

module.exports = {
    blogs: async () => {
        try {
            const blogs = await Blogs.find()
            return blogs.map(blog => {
                return {
                    ...blog._doc,
                };
            })
        }
        catch (err) {
            console.log(err)
            throw err;
        }
    },
    createBlog: async (args, req) => {
        if (!req.isAuth) {
            throw new Error('Unauthenticated');
        }
        const blog = new Blogs({
            Title: args.blogInput.Title,
            Excerpt: args.blogInput.Excerpt,
            Author: args.blogInput.Author,
            Tag: args.blogInput.Tag,
            Image: args.blogInput.Image
        });
        let createdBlog;
        try {
            const result = await blog.save();

            createdBlog = {
                ...result._doc
            }
            return createdBlog;
        } catch (error) {
            throw error;
        }
    },
    updateBlog: async (args, req) => {
        try {
            let updatedBlog;
            if (!req.isAuth) {
                throw new Error('Unauthenticated');
            }
            const findBlog = await Blogs.findOne({ _id: args.blogInputUpdate._id });

            if (!findBlog) {
                throw new Error('Blog does not exists.');
            }

            findBlog.Title = args.blogInputUpdate.Title;
            findBlog.Excerpt = args.blogInputUpdate.Excerpt;
            findBlog.Author = args.blogInputUpdate.Author;
            findBlog.Tag = args.blogInputUpdate.Tag;

            const result = await findBlog.save();

            updatedBlog = {
                ...result._doc
            }

            return updatedBlog;

        } catch (error) {
            throw error;
        }
    },
    deleteBlog: async (args, req) => {
        if (!req.isAuth) {
            throw new Error('Unauthenticated');
        }
        await Blogs.deleteOne({ _id: args.blogId });
        return 'Blog succesfully deleted';
    }
}