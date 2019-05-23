import styled from '@emotion/styled';
import { Link } from '../UI/Link';
// common components
// usage import {Container, CollectionsContainer} from 'path to /components/Home'

export const Container = styled.section`
  margin: 0 auto 15px;
  max-width: 1100px;
  width: 100%;
`;

export const Title = styled.h2`
  padding: 10px 4px;
  border-bottom: 1px solid #ccc;
`;

// right aligns the link
export const LinkContainer = styled.div`
  text-align: right;
  margin-top: 15px;
`;

export const StyledLink = styled(Link)`
  color: inherit;
  text-decoration: none;
  :hover {
    color: inherit;
    text-decoration: underline;
    text-decoration-color: #1a5a96;
  }
`;

export { CollectionsContainer } from './CollectionsContainer';
export { Masthead } from './Masthead';
export { ResourcePreview } from './ResourcePreview';
