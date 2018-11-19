import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/actions';
import { Flag } from 'flag';
import classes from './PrimaryHeader.module.css';
import { APP_TITLE } from '../../constants/strings';
import Banner from '../Common/Banner';
import Login from '../Auth/Login/Login';
import Button from '../UI/Button/Button';

export const PrimaryHeader = ({ filterSiphonNodes }) => {
  return (
    <header className={classes.PrimaryHeader}>
      <Banner title={APP_TITLE} navigateOnClickPath="/" />
      <div>
        <Flag name="features.login">
          <Login />
        </Flag>
        <Flag name="features.filterSources">
          <Button
            clicked={() => {
              filterSiphonNodes('All');
            }}
          >
            All
          </Button>
          <Button
            clicked={() => {
              filterSiphonNodes('Components');
            }}
          >
            Components
          </Button>
          <Button
            clicked={() => {
              filterSiphonNodes('Documentation');
            }}
          >
            Documentation
          </Button>
          <Button
            clicked={() => {
              filterSiphonNodes('Self-Service Tools');
            }}
          >
            Self-Service Tools
          </Button>
        </Flag>
      </div>
    </header>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    filterSiphonNodes: value => dispatch(actions.filterSiphonNodes('resource.type', value)),
  };
};

export default connect(null, mapDispatchToProps)(PrimaryHeader);
