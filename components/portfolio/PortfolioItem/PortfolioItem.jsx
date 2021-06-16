import Link from 'next/link';
import { Container } from './styles';

const PortfolioItem = ({ portfolio, updatePortfolio }) => {
  return (
    <Container>
      <Link href='/portfolios/[id]' as={`/portfolios/${portfolio._id}`}>
        <a>
          <h3>{portfolio.title}</h3>
          <h5>{portfolio.description}</h5>
        </a>
      </Link>
      <p>{portfolio.jobTitle}</p>
      <small>{portfolio.company}</small>
      <button onClick={() => updatePortfolio(portfolio._id)}>Update</button>
    </Container>
  );
};

export default PortfolioItem;
