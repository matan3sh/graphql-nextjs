import Link from 'next/link';

import { useQuery } from '@apollo/client';
import { GET_PORTFOLIO } from 'apollo/queries';

import { Container } from 'styles';

const PortfolioPage = ({ query }) => {
  const { loading, error, data } = useQuery(GET_PORTFOLIO, {
    variables: { id: query.id },
  });

  if (loading) return 'Loading...';

  const portfolio = (data && data.portfolio) || {};

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
  return { query };
};

export default PortfolioPage;
