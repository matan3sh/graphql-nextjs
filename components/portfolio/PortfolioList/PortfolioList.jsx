import PortfolioItem from '../PortfolioItem/PortfolioItem';
import { Container } from './styles';

const PortfolioList = ({ portfolios }) => {
  return (
    <Container>
      {portfolios.map((portfolio) => (
        <PortfolioItem portfolio={portfolio} key={portfolio._id} />
      ))}
    </Container>
  );
};

export default PortfolioList;
