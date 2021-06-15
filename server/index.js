const express = require('express');
const next = require('next');

const graphqlHTTP = require('express-graphql').graphqlHTTP;
const { buildSchema } = require('graphql');
const { portfolioResolvers } = require('./graphql/resolvers');
const { portfolioTypes } = require('./graphql/types');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  const schema = buildSchema(`
    ${portfolioTypes}
    type Query {
      portfolios: [Portfolio]
      portfolio(id: ID): Portfolio
    }
  `);

  const root = {
    ...portfolioResolvers,
  };

  server.use(
    '/graphql',
    graphqlHTTP({
      schema,
      rootValue: root,
      graphiql: true,
    })
  );

  server.all('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
