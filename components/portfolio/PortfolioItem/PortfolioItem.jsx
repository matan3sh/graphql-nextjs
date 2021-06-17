import Link from 'next/link';
import { Container, Buttons } from './styles';

const PortfolioItem = ({ portfolio, updatePortfolio, deletePortfolio }) => {
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
      <Buttons>
        <button
          onClick={() => updatePortfolio({ variables: { id: portfolio._id } })}
        >
          Update
        </button>
        <button onClick={() => deletePortfolio(portfolio._id)}>Delete</button>
      </Buttons>
    </Container>
  );
};

export default PortfolioItem;
