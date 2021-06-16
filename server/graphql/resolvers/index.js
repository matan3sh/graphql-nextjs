const data = require('../../data');

exports.portfolioQueries = {
  portfolio: (root, { id }) => {
    const portfolio = data.portfolios.find((p) => p._id === id);
    return portfolio;
  },

  portfolios: () => {
    return data.portfolios;
  },
};

exports.portfolioMutations = {
  createPortfolio: (root, { input }) => {
    input._id = require('crypto').randomBytes(10).toString('hex');
    const newPortfolio = { ...input };
    data.portfolios.push(newPortfolio);
    return newPortfolio;
  },

  updatePortfolio: (root, { id, input }) => {
    const index = data.portfolios.findIndex((p) => p._id === id);
    const oldPortfolio = data.portfolios[index];
    const updatedPortfolio = { ...oldPortfolio, ...input };
    data.portfolios[index] = updatedPortfolio;
    return updatedPortfolio;
  },

  deletePortfolio: (root, { id }) => {
    const index = data.portfolios.findIndex((p) => p._id === id);
    data.portfolios.splice(index, 1);
    return id;
  },
};
