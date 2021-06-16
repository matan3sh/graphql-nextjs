import PortfolioItem from '../PortfolioItem/PortfolioItem';
import { Container } from './styles';

const PortfolioList = ({ portfolios, updatePortfolio }) => {
  return (
    <Container>
      {portfolios.map((portfolio) => (
        <PortfolioItem
          portfolio={portfolio}
          key={portfolio._id}
          updatePortfolio={updatePortfolio}
        />
      ))}
    </Container>
  );
};

export default PortfolioList;
