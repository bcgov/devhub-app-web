import styled from '@emotion/styled';

const Main = styled.main`
  font-size: 15px;
  max-width: 1200px;
  padding: ${props => props.theme.padding.main.mobile};
  ${props => props.theme.breakpoints.main.desktop} {
    padding: ${props => props.theme.padding.main.desktop};
  }
`;

export default Main;
