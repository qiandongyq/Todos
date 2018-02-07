const express = require('express');
const bodyParser = require('body-parser');
const { graphqlExpress } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');
const cors = require('cors');
const expressPlayground = require('graphql-playground-middleware-express').default;
const typeDefs = require('./schema.gql');
const resolvers = require('./resolvers');

const app = express();
const todos = require('./data.json');

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

app.use(cors());

app.use(
  '/graphql',
  bodyParser.json(),
  graphqlExpress({
    schema,
    context: {
      todos,
    },
  }),
);

app.get('/playground', expressPlayground({ endpoint: '/graphql' }));

const PORT = 3001 || process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is runing on PORT: ${PORT}`);
});
