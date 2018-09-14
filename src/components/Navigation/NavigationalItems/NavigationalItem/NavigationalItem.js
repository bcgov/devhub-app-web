import React from 'react'
import PropTypes from 'prop-types';
import classes from './NavigationalItem.module.css';
import hexImage from '../../../../assets/images/hex#.svg';

const NavigationalItem = ({ children, bgColor }) => {
    return (
        <li className={classes.NavigationalItem}>
            <div>
                <img src={ "https://farm3.staticflickr.com/2827/10384422264_d9c7299146.jpg" } alt="hex background" />
                { children }
            </div>
        </li>
    )
}

export default NavigationalItem;

