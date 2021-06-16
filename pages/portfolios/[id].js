import { useState, useEffect } from 'react';
import Link from 'next/link';

import { useLazyQuery } from '@apollo/client';
import { GET_PORTFOLIO } from 'apollo/queries';

import { Container } from 'styles';

const PortfolioPage = ({ query }) => {
  const [portfolio, setPortfolio] = useState(null);
  const [getPortfolio, { loading, data }] = useLazyQuery(GET_PORTFOLIO);

  useEffect(() => {
    getPortfolio({ variables: { id: query.id } });
  }, []);

  if (data && !portfolio) setPortfolio(data.portfolio);

  if (loading || !portfolio) return 'Loading...';

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
