import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
*,
::before,
::after {
  box-sizing: border-box;
  margin: 0;
}

html{
  overflow-x: hidden;
  -webkit-appearance: none;

}

html,
body {
  height: 100vh;
  font-family: 'Space Grotesk', sans-serif !important;
  scroll-behavior: smooth;
}

ul {
  list-style: none;
}

a {
  color: inherit;
  text-decoration: none !important;
}
input{
  -webkit-appearance: none !important;
  -moz-appearance: none !important;
  appearance: none !important;
}
`;
export default GlobalStyle;
