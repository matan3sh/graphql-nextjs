import axios from 'axios';

import withApollo from 'apollo/withApollo';
import { getDataFromTree } from '@apollo/client/react/ssr';

import { useQuery, useMutation } from '@apollo/client';
import { GET_PORTFOLIOS } from 'apollo/queries';
import { CREATE_PORTFOLIO, UPDATE_PORTFOLIO } from 'apollo/mutations';

import { PortfolioList } from 'components/portfolio';

import { Container, Actions } from 'styles';

const removePortfolio = (id) => {
  const query = `
    mutation DeletePortfolio {
      deletePortfolio(id:"${id}")
    }
  `;
  return axios
    .post('http://localhost:3000/graphql', { query })
    .then(({ data: graph }) => graph.data)
    .then((data) => data.deletePortfolio);
};

const PortfoliosPage = () => {
  const { data } = useQuery(GET_PORTFOLIOS);

  const [createPortfolio] = useMutation(CREATE_PORTFOLIO, {
    update(cache, { data: { createPortfolio } }) {
      const { portfolios } = cache.readQuery({ query: GET_PORTFOLIOS });
      cache.writeQuery({
        query: GET_PORTFOLIOS,
        data: { portfolios: [...portfolios, createPortfolio] },
      });
    },
  });
  // const [updatePortfolio] = useMutation(UPDATE_PORTFOLIO, {

  // })

  const updatePortfolio = async (id) => {
    await editPortfolio(id);
  };

  const deletePortfolio = async (id) => {
    await removePortfolio(id);
  };

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
