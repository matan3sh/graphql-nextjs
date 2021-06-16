const portfolioFields = `
  title: String
  company: String
  companyWebsite: String
  location: String
  description: String
  jobTitle: String
  startDate: String
  endDate: String
`;

exports.portfolioTypes = `
  type Portfolio {
    _id: ID
    ${portfolioFields}
  }

  input PortfolioInput {
    ${portfolioFields}
  }
`;
