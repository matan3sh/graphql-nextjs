import Link from 'next/link';
import { Container } from './styles';

const PortfolioItem = ({ portfolio }) => {
  return (
    <Container>
      <Link href={`/portfolios/${portfolio._id}`}>
        <a>
          <h3>{portfolio.title}</h3>
          <h5>{portfolio.description}</h5>
          <p>{portfolio.jobTitle}</p>
          <small>{portfolio.company}</small>
        </a>
      </Link>
    </Container>
  );
};

export default PortfolioItem;
