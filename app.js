const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const mongoose = require('mongoose')
const isAuth = require('./middleware/is-auth')
const cors = require('cors')
const connectionDatabase = require('./config/appDbConnection')

const graphQlSchema = require('./graphql/schema/index')
const graphQlResolvers = require('./graphql/resolvers/index')

const app = express();

connectionDatabase();

app.use(cors());
app.use( express.json({ extend: true }));

const port = process.env.PORT || 3001;
app.use(isAuth);

app.use(
    '/graphql',
    graphqlHTTP({
        schema: graphQlSchema,
        rootValue: graphQlResolvers,
        graphiql: true
    })
);

app.listen(port, '0.0.0.0', () => {
    console.log(`El servidor esta funcionando en el puerto ${port}`);
})