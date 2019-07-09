/*
Copyright 2018 Province of British Columbia

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at 

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

Created by Patrick Simonian
*/
import React from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import NavigationItem from './NavigationItem/NavigationItem';
import devexLogo from '../../assets/images/devex.svg';
import styled from '@emotion/styled';

const LinkButton = styled.button`
  margin: 0;
  padding: 0;
  background: none;
  outline: none;
  cursor: pointer;
  color: inherit;
  border: none;
  font-size: 0.813em;
  :focus {
    outline: none;
  }
  :hover {
    text-decoration: underline;
  }
`;

const NavigationItems = ({ items, setToggled }) => {
  const navigationitems = items.map(item => (
    <NavigationItem to={item.to} text={item.text} key={shortid.generate()} />
  ));

  return (
    <ul>
      {navigationitems}
      <li>
        <LinkButton onClick={() => setToggled(true)}>Fair Use</LinkButton>
      </li>
      <li>
        <a
          href="https://bcdevexchange.org"
          title="BC Dev Exchange"
          aria-label="View the BC Dev Exchange Organization"
          style={{
            display: 'inline-block',
            width: '125px',
          }}
        >
          <img src={devexLogo} alt="Government Of BC" style={{ margin: 0, maxHeight: '50px' }} />
        </a>
      </li>
    </ul>
  );
};

NavigationItems.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      to: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
    }),
  ),
  setToggled: PropTypes.func.isRequired,
};

NavigationItems.defaultProps = {
  items: [],
};

export default NavigationItems;
