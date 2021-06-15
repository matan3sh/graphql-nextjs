const data = require('../../data');

exports.portfolioResolvers = {
  portfolio: ({ id }) => {
    const portfolio = data.portfolios.find((p) => p._id === id);
    return portfolio;
  },
  portfolios: () => {
    return data.portfolios;
  },
};
