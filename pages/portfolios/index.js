import withApollo from 'apollo/withApollo';
import { getDataFromTree } from '@apollo/client/react/ssr';

import {
  useGetPortfolios,
  useUpdatePortfolio,
  useCreatePortfolio,
  useDeletePortfolio,
} from 'apollo/actions';

import { PortfolioList } from 'components/portfolio';
import { Container, Actions } from 'styles';

const PortfoliosPage = () => {
  const { data } = useGetPortfolios();
  const [updatePortfolio] = useUpdatePortfolio();
  const [createPortfolio] = useCreatePortfolio();
  const [deletePortfolio] = useDeletePortfolio();

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
