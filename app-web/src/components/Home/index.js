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
  font-size: 1.5em;
  padding: 10px 4px;
  margin-bottom: 10px;
  border-bottom: 1px solid #ccc;
  font-weight: 600;
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
    text-decoration: none;
  }
`;

export { CollectionsContainer } from './CollectionsContainer';
export { Masthead } from './Masthead';
export { ResourcePreview } from './ResourcePreview';
