import { useState } from 'react';
import axios from 'axios';

import { PortfolioList } from 'components/portfolio';

import { Container, Actions } from 'styles';

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

const PortfoliosPage = ({ data }) => {
  const [portfolios, setPortfolios] = useState(data.portfolios);

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

  return (
    <Container>
      <Actions>
        <button onClick={createPortfolio}>Create Portfolio</button>
      </Actions>
      {portfolios && (
        <PortfolioList
          portfolios={portfolios}
          updatePortfolio={updatePortfolio}
        />
      )}
    </Container>
  );
};

PortfoliosPage.getInitialProps = async () => {
  const portfolios = await fetchPortfolios();
  return { data: { portfolios } };
};

export default PortfoliosPage;
