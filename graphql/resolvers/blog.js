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
    }
}