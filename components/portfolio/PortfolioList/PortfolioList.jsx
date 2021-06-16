import PortfolioItem from '../PortfolioItem/PortfolioItem';
import { Container } from './styles';

const PortfolioList = ({ portfolios, updatePortfolio, deletePortfolio }) => {
  return (
    <Container>
      {portfolios.map((portfolio) => (
        <PortfolioItem
          portfolio={portfolio}
          key={portfolio._id}
          updatePortfolio={updatePortfolio}
          deletePortfolio={deletePortfolio}
        />
      ))}
    </Container>
  );
};

export default PortfolioList;
