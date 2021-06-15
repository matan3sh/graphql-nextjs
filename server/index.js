const express = require('express');
const next = require('next');

const graphqlHTTP = require('express-graphql').graphqlHTTP;
const { buildSchema } = require('graphql');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const data = require('./data');

app.prepare().then(() => {
  const server = express();

  const schema = buildSchema(`
    type Portfolio {
      _id: ID
      title: String
      company: String
      companyWebsite: String
      location: String
      description: String
      jobTitle: String
      startDate: String
      endDate: String
    }

    type Query {
      hello: String
      portfolio: Portfolio
      portfolios: [Portfolio]
    }
  `);

  const root = {
    hello: () => {
      return 'Hello World';
    },
    portfolio: () => {
      return data.portfolios[0];
    },
    portfolios: () => {
      return data.portfolios;
    },
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
