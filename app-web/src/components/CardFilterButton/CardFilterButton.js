import React from 'react';
import PropTypes from 'prop-types';
import Button from '../../components/UI/Button/Button'
import { connect } from 'react-redux';
import * as actions from "../../store/actions/actions";

export const CardFilterButton = ({filterByProperty, filterByValue, filterSiphonNodes, children, ...rest }) => {
    return (
        <Button clicked={() => filterSiphonNodes(filterByProperty, filterByValue)} {...rest}>
            {children}
        </Button>
    );
};

CardFilterButton.propTypes = {
    children: PropTypes.string
};

CardFilterButton.defaultProps = {
    children: '',
};

const mapDispatchToProps = dispatch => {
    return {
        filterSiphonNodes: (filterBy, value) => dispatch(actions.filterSiphonNodes(filterBy, value)),
    };
};

export default connect(null, mapDispatchToProps)(CardFilterButton);
