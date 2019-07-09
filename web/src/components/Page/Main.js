import styled from '@emotion/styled';

export const Main = styled.main`
  font-size: 15px;
  max-width: 1300px;
  margin: 0;
  padding: ${props => props.theme.padding.main.mobile};
  ${props => props.theme.breakpoints.main.desktop} {
    padding: ${props => props.theme.padding.main.desktop};
  }
`;

export default Main;
