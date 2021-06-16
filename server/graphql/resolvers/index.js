const data = require('../../data');

exports.portfolioResolvers = {
  portfolio: ({ id }) => {
    const portfolio = data.portfolios.find((p) => p._id === id);
    return portfolio;
  },

  portfolios: () => {
    return data.portfolios;
  },

  createPortfolio: ({ input }) => {
    input._id = require('crypto').randomBytes(10).toString('hex');
    const newPortfolio = { ...input };
    data.portfolios.push(newPortfolio);
    return newPortfolio;
  },
};
