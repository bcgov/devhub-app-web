import React from 'react';
import { Flag } from 'flag';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/actions';
import classes from './PrimaryHeader.module.css';
import { APP_TITLE } from '../../constants/ariaLabels';
import Banner from '../UI/Banner/Banner';
import Hamburger from '../UI/Hamburger/Hamburger';
import Login from '../Auth/Login/Login';
import Aux from '../../hoc/auxillary';
import PrimaryFilter from '../PrimaryFilter/PrimaryFilter';
import { HOME_ROUTE } from '../../constants/routes';
export const PrimaryHeader = ({ path, toggleMenu, menuToggled }) => {
  // only show primary filter on home page
  const primaryFilter =
    path === HOME_ROUTE ? (
      <Flag name="features.sourceFiltering">
        <PrimaryFilter />
        {menuToggled ? <PrimaryFilter mobile /> : null}
      </Flag>
    ) : null;
  return (
    <Aux>
      <header className={classes.PrimaryHeader}>
        <Banner title={APP_TITLE} navigateOnClickPath="/" />
        <div className={classes.Other}>
          <Flag name="features.login">
            <Login />
          </Flag>
          {path === HOME_ROUTE ? (
            <Hamburger clicked={toggleMenu} className={classes.Hamburger} />
          ) : null}
        </div>
      </header>
      {primaryFilter}
    </Aux>
  );
};
const mapStateToProps = state => ({
  menuToggled: state.ui.mainNavigationToggled,
});

const mapDispatchToProps = dispatch => ({
  toggleMenu: () => dispatch(actions.toggleMainNavigation()),
});

export default connect(mapStateToProps, mapDispatchToProps)(PrimaryHeader);
