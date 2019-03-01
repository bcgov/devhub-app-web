import React from 'react';
import styled from '@emotion/styled';
import Filters from '../Filters/Filters';

const FilterContainer = styled.div`
  flex-basis: 250px;
  padding: 5px;
  margin-right: 15px;
  border: 2px solid #ccc;
  min-height: 250px;
`;

const FilterMenu = ({ filters }) => (
  <FilterContainer>
    <Filters filters={filters} />
  </FilterContainer>
);

export default FilterMenu;
