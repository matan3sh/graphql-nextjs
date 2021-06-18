import withApollo from 'apollo/withApollo';
import { getDataFromTree } from '@apollo/client/react/ssr';

import { useQuery, useMutation } from '@apollo/client';
import { GET_PORTFOLIOS } from 'apollo/queries';
import {
  CREATE_PORTFOLIO,
  UPDATE_PORTFOLIO,
  DELETE_PORTFOLIO,
} from 'apollo/mutations';

import { PortfolioList } from 'components/portfolio';

import { Container, Actions } from 'styles';

const PortfoliosPage = () => {
  const { data } = useQuery(GET_PORTFOLIOS);

  const [updatePortfolio] = useMutation(UPDATE_PORTFOLIO);

  const [createPortfolio] = useMutation(CREATE_PORTFOLIO, {
    update(cache, { data: { createPortfolio } }) {
      const { portfolios } = cache.readQuery({ query: GET_PORTFOLIOS });
      cache.writeQuery({
        query: GET_PORTFOLIOS,
        data: { portfolios: [...portfolios, createPortfolio] },
      });
    },
  });

  const [deletePortfolio] = useMutation(DELETE_PORTFOLIO, {
    update(cache, { data: { deletePortfolio } }) {
      const { portfolios } = cache.readQuery({ query: GET_PORTFOLIOS });
      const updatedPortfolios = portfolios.filter(
        (p) => p._id !== deletePortfolio
      );
      cache.writeQuery({
        query: GET_PORTFOLIOS,
        data: { portfolios: updatedPortfolios },
      });
    },
  });

  const portfolios = (data && data.portfolios) || [];

  return (
    <Container>
      <Actions>
        <button onClick={createPortfolio}>Create Portfolio</button>
      </Actions>

      {portfolios && (
        <PortfolioList
          portfolios={portfolios}
          updatePortfolio={updatePortfolio}
          deletePortfolio={deletePortfolio}
        />
      )}
    </Container>
  );
};

export default withApollo(PortfoliosPage, { getDataFromTree });
