const express = require('express');
const next = require('next');

const { ApolloServer, gql } = require('apollo-server-express');
const { portfolioQueries, portfolioMutations } = require('./graphql/resolvers');
const { portfolioTypes } = require('./graphql/types');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  const typeDefs = gql`
    ${portfolioTypes}

    type Query {
      portfolios: [Portfolio]
      portfolio(id: ID): Portfolio
    }
    type Mutation {
      createPortfolio(input: PortfolioInput): Portfolio
      updatePortfolio(id: ID, input: PortfolioInput): Portfolio
    }
  `;

  const resolvers = {
    Query: {
      ...portfolioQueries,
    },
    Mutation: {
      ...portfolioMutations,
    },
  };

  const apolloServer = new ApolloServer({ typeDefs, resolvers });
  apolloServer.applyMiddleware({ app: server });

  server.all('*', (req, res) => {
    return handle(req, res);
  });

  const port = parseInt(process.env.PORT, 10) || 3000;
  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
