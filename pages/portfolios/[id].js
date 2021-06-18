import Link from 'next/link';

import withApollo from 'apollo/withApollo';
import { getDataFromTree } from '@apollo/client/react/ssr';

import { useQuery } from '@apollo/client';
import { GET_PORTFOLIO } from 'apollo/queries';

import { Container } from 'styles';

const PortfolioPage = ({ query }) => {
  const { data, loading, error } = useQuery(GET_PORTFOLIO, {
    variables: { id: query.id },
  });

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

export default withApollo(PortfolioPage, { getDataFromTree });
