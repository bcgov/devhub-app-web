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
import classes from './PrimaryFooter.module.css';
import devexLogo from '../../assets/images/devex.svg';
import NavigationItems from '../NavigationItems/NavigationItems';
import { FOOTER_NAVIGATION } from '../../constants/routes';

const PrimaryFooter = () => (
  <footer className={classes.PrimaryFooter}>
    <div className={classes.Container}>
      <NavigationItems items={FOOTER_NAVIGATION} />
      <a
        href="https://bcdevexchange.org"
        title="BC Dev Exchange"
        aria-label="View the BC Dev Exchange Organization"
        style={{
          display: 'inline-block',
          margin: '0 5px',
          width: '50px',
        }}
      >
        <img src={devexLogo} alt="Government Of BC" style={{ margin: 0, maxHeight: '50px' }} />
      </a>
    </div>
  </footer>
);

export default PrimaryFooter;
