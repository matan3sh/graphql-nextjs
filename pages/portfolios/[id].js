import Link from 'next/link';
import axios from 'axios';

import { Container } from 'styles';

const fetchPortfolioById = (id) => {
  const query = `
  query Portfolio($id: ID) {
    portfolio(id: $id) {
      _id,
      title,
      company,
      jobTitle
      description
    }
  }
  `;
  const variables = { id };
  return axios
    .post('http://localhost:3000/graphql', { query, variables })
    .then(({ data: graph }) => graph.data)
    .then((data) => data.portfolio);
};

const PortfolioPage = ({ portfolio }) => {
  return (
    <Container>
      <Link href='/portfolios'>
        <a>Back</a>
      </Link>
      <h1>{portfolio.title}</h1>
      <h5>{portfolio.company}</h5>
    </Container>
  );
};

PortfolioPage.getInitialProps = async ({ query }) => {
  const portfolio = await fetchPortfolioById(query.id);
  return { portfolio };
};

export default PortfolioPage;
