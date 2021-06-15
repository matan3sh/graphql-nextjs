import { Container } from './styles';

const PortfolioItem = ({ portfolio }) => {
  return (
    <Container>
      <h3>{portfolio.title}</h3>
      <p>{portfolio.description}</p>
      <span>{portfolio.jobTitle}</span>
      <small>{portfolio.company}</small>
    </Container>
  );
};

export default PortfolioItem;
