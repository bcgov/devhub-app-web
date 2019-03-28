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
import React, { useState } from 'react';
import styled from '@emotion/styled';
import NavigationItems from '../NavigationItems/NavigationItems';
import { FOOTER_NAVIGATION } from '../../constants/routes';
import Disclaimer from '../Disclaimer/Disclaimer';

const Footer = styled.footer`
  background-color: #036;
  border-top: 2px solid #fcba19;
  padding: 9px 0 10px;
  color: #fff;
  padding: 0 12px 0 25px;

  @media screen and (min-width: 600px) {
    padding: 0 65px 0 65px;
  }

  @media print {
    display: none;
  }
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  > ul {
    display: flex;
    flex-flow: row wrap;
    list-style: none;
    margin: 10px 0;
  }
  li {
    padding: 0 9px;
    text-align: center;
    margin-bottom: 0;
    display: flex;
    align-items: center;
  }
`;

const PrimaryFooter = () => {
  const [toggled, setToggled] = useState(false);
  return (
    <Footer>
      <Container>
        <NavigationItems items={FOOTER_NAVIGATION} setToggled={setToggled} />
        <Disclaimer
          open={toggled}
          onClose={() => setToggled(false)}
          toggle={() => setToggled(!toggled)}
        />
      </Container>
    </Footer>
  );
};

export default PrimaryFooter;
