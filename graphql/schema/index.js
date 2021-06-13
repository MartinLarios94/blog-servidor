const { buildSchema } = require('graphql')

module.exports = buildSchema(`

type Blog {
    _id: ID!
    Title: String!
    Excerpt: String!
    Author: String!
    Tag: String!
    Image: String!
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

input BlogInput {
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
    login(email: String!, password: String!): AuthData!
}

type RootMutation {
    createBlog(blogInput: BlogInput): Blog
    updateBlog(blogInput: BlogInput): Blog
    deleteBlog(blogId: String!): Blog
    createUser(userInput: UserInput): User
}

schema {
    query: RootQuery,
    mutation: RootMutation
}

`)