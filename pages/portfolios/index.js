import axios from 'axios';

import { PortfolioList } from 'components/portfolio';

import { Container } from 'styles';

const fetchPortfolios = () => {
  const query = `
  query Portfolios {
    portfolios {
      _id,
      title,
      company,
      jobTitle
      description
    }
  }
  `;
  return axios
    .post('http://localhost:3000/graphql', { query })
    .then(({ data: graph }) => graph.data)
    .then((data) => data.portfolios);
};

const PortfoliosPage = ({ portfolios }) => {
  return (
    <Container>
      {portfolios && <PortfolioList portfolios={portfolios} />}
    </Container>
  );
};

PortfoliosPage.getInitialProps = async () => {
  const portfolios = await fetchPortfolios();
  return { portfolios };
};

export default PortfoliosPage;
