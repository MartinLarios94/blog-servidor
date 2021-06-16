const { buildSchema } = require('graphql')

module.exports = buildSchema(`

enum Sort{
    ASC
    DESC
}

type Blog {
    _id: ID!
    Title: String!
    Excerpt: String!
    Author: String!
    Tag: String!
    Image: String!
    CreateDate: String!
    Views: Int
    Likes: Int
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
    CreateDate: Int
}

input PaginationBlogs{
    limited: Int
    start: Int
    currentPage: Int
}

input BlogInput {
    Title: String!
    Excerpt: String!
    Author: String!
    Tag: String!
    Image: String!
    CreateDate: String
    Views: Int
    Likes: Int
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
    blogs: [Blog!]!
    sortBlogs(sort: SortBlogs): [Blog!]
    login(email: String!, password: String!): AuthData!
    paginationBlogs: [Blog!]
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
}

`)