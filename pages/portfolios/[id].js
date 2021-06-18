import Link from 'next/link';

import withApollo from 'apollo/withApollo';
import { getDataFromTree } from '@apollo/client/react/ssr';

import { useGetPortfolio } from 'apollo/actions';

import { Container } from 'styles';

const PortfolioPage = ({ query }) => {
  const { data } = useGetPortfolio(query.id);

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
