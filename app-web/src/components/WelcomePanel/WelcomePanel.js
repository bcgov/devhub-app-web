import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CardFilterButton from '../CardFilterButton/CardFilterButton';
import { DEFAULT_FILTERS } from '../../constants/filterGroups';
import { GITHUB_ISSUES_ROUTE } from '../../constants/routes';
import { REACT_SCROLL } from '../../constants/ui';
import styles from './WelcomePanel.module.css';

export class WelcomePanel extends Component {
  render() {
    const { displayWelcome } = this.props;

    if (!displayWelcome) {
      return null;
    }

    return (
      <section className="jumbotron text-center">
        <h1 className="jumbotron-heading">Welcome.</h1>

        <h3> We are here to help.</h3>

        <p className="lead">
          This is the front door to the developer community of the BC Government. The aim of the
          DevHub is to help developers and digital product teams learn new skills and discover
          resources to use on their journeys of creating amazing applications for government.
        </p>
        <p>
          In the future, we plan to offer a variety of cool and useful ways to organize and navigate
          DevHub resources. For now, you can tell us who you are below and we'll tailor the set of
          resources shown just for you.
        </p>

        <div className={'d-flex justify-content-center align-items-center'}>
          <CardFilterButton
            scrollToTarget={REACT_SCROLL.ELEMENTS.CARDS_CONTAINER}
            filterKey={DEFAULT_FILTERS.PERSONA_DEVELOPER.key}
            className={['btn btn-outline-primary', styles.PersonaButton].join(' ')}
          >
            I'm a Developer
          </CardFilterButton>
          <CardFilterButton
            scrollToTarget={REACT_SCROLL.ELEMENTS.CARDS_CONTAINER}
            filterKey={DEFAULT_FILTERS.PERSONA_DESIGNER.key}
            className={['btn btn-outline-success', styles.PersonaButton].join(' ')}
          >
            I'm a Designer
          </CardFilterButton>
        </div>

        <blockquote className="blockquote">
          <p className="mb-0">Thanks for visiting!</p>
          <footer className="blockquote-footer">The DevHub Team.</footer>
        </blockquote>

        <p className="text-muted">
          PS. If you’d like to comment, offer a suggestion or ask a question you can find us by
          opening an issue in our <a href={GITHUB_ISSUES_ROUTE}>GitHub</a> repository.
        </p>
      </section>
    );
  }
}

WelcomePanel.propTypes = {
  displayWelcome: PropTypes.bool.isRequired,
};

const mapStateToProps = state => {
  return {
    displayWelcome: !state.ui.welcomePanelWasViewed,
  };
};

export default connect(
  mapStateToProps,
  null,
)(WelcomePanel);
