import React from 'react';
import PropTypes from 'prop-types';
import Button from '../../components/UI/Button/Button'
import {connect} from 'react-redux';
import * as actions from "../../store/actions/actions";


export const CardFilterButton = ({type, filterByProperty, filterByValue, filterSiphonNodes, resetFilter, children, ...rest}) => {

    let clicky = function() {
        resetFilter();
        filterSiphonNodes(filterByProperty, filterByValue)
    };

    return (
        <Button clicked={() => clicky() } {...rest}>
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
        resetFilter: (filterBy, value) => dispatch(actions.setSelectedFilterOption({
            value: '{"filterBy":"resource.type","value":"All"}',
            label: 'All'
        })),
    };
};

export default connect(null, mapDispatchToProps)(CardFilterButton);
