import { useState, useEffect } from 'react';
import axios from 'axios';

import { useLazyQuery } from '@apollo/client';
import { GET_PORTFOLIOS } from 'apollo/queries';

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

const editPortfolio = (id) => {
  const query = `
  mutation UpdatePortfolio {
    updatePortfolio(id: "${id}",input: {
      title:"Updated Job!!!"
    }) {
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
    .then((data) => data.updatePortfolio);
};

const addPortfolio = () => {
  const query = `
  mutation CreatePortfolio {
    createPortfolio(input: {
      title:"New Job"
      company:"New Company"
      companyWebsite:"New Website"
      location: "New Location"
      jobTitle:"new Job Title"
      description:"New Desc"
      startDate:"12/12/2020"
      endDate:"12/06/2021"
    }) {
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
    .then((data) => data.createPortfolio);
};

const PortfoliosPage = () => {
  const [portfolios, setPortfolios] = useState([]);
  const [getPortfolios, { loading, data }] = useLazyQuery(GET_PORTFOLIOS);

  useEffect(() => {
    getPortfolios();
  }, []);

  if (data && data.portfolios.length > 0 && portfolios.length === 0)
    setPortfolios(data.portfolios);
  if (loading) return 'Loading...';

  const createPortfolio = async () => {
    const newPortfolio = await addPortfolio();
    const updatedPortfolios = [...portfolios, newPortfolio];
    setPortfolios(updatedPortfolios);
  };

  const updatePortfolio = async (id) => {
    const newPortfolio = await editPortfolio(id);
    const updatedPortfolios = portfolios.map((p) =>
      p._id === id ? newPortfolio : p
    );
    setPortfolios(updatedPortfolios);
  };

  const deletePortfolio = async (id) => {
    await removePortfolio(id);
    const updatedPortfolios = portfolios.filter((p) => p._id !== id);
    setPortfolios(updatedPortfolios);
  };

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

export default PortfoliosPage;
