import React from 'react';
import styled from '@emotion/styled';
import Filters from '../Filters/Filters';
import { EMOTION_BOOTSTRAP_BREAKPOINTS } from '../../constants/designTokens';

const FilterContainer = styled.div`
  flex: 0 0 200px;
  padding: 5px;
  margin-right: 15px;
  border: 2px solid #ccc;
  min-height: 250px;
  display: none;
  ${EMOTION_BOOTSTRAP_BREAKPOINTS.sm} {
    display: block;
  }
`;

export const FilterMenu = ({ filters }) => (
  <FilterContainer>
    <Filters filters={filters} />
  </FilterContainer>
);

export default FilterMenu;
