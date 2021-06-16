const { buildSchema } = require('graphql')

module.exports = buildSchema(`
type Blog {
    _id: ID!
    Title: String!
    Excerpt: String!
    Author: String!
    Tag: String
    Image: BlogImageOutput
    Views: Int
    Likes: Int
    createdAt: String
    updatedAt: String
}

type Result {
    blogs: [Blog]
    total: Int
}

type User {
    _id: ID!
    email: String!
    password: String
}

type AuthData {
    userId: ID!
    token: String!
    tokenExpiration: Int!
}

input SortBlogs{
    createdAt: Dir
    Title: Dir
    Author: Dir
    Views: Dir
    Likes: Dir
}

enum Dir {
    asc
    desc
}

input PaginationBlogs{
    limit: Int = 9
    skip: Int
}

input BlogInput {
    Title: String!
    Excerpt: String!
    Author: String!
    Tag: String!
    Image: BlogImage!
    Views: Int
    Likes: Int
}

type BlogImageOutput {
    Content: String
    Orientation: String
}

input BlogImage {
    Content: String
    Orientation: String
}

input BlogInputUpdate {
    _id: String!
    Title: String!
    Excerpt: String!
    Author: String!
    Tag: String!
    Image: String!
}

input UserInput {
    email: String!
    password: String
}

type RootQuery {
    blogs(sort: SortBlogs, pagination: PaginationBlogs): Result!
    login(email: String!, password: String!): AuthData!
}

type RootMutation {
    createBlog(blogInput: BlogInput): Blog
    updateBlog(blogInputUpdate: BlogInputUpdate): Blog
    deleteBlog(blogId: String!): String
    createUser(userInput: UserInput): User
}

schema {
    query: RootQuery,
    mutation: RootMutation
}`)