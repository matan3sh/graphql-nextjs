import Link from 'next/link';

import { Container } from 'styles';

const HomePage = () => {
  return (
    <Container>
      <h2>Home Page</h2>
      <Link href='/portfolios'>
        <a>Portfolios</a>
      </Link>
    </Container>
  );
};

export default HomePage;
