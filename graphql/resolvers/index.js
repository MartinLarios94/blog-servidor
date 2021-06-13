const authResolver = require('./auth')
const blogsResolver = require('./blog')

const RootResolver = {
    ...authResolver,
    ...blogsResolver
}

module.exports = RootResolver;
