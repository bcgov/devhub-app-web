import React from 'react';
import { Link } from '../UI/Link';

import PropTypes from 'prop-types';
import styled from '@emotion/styled';

import isFunction from 'lodash/isFunction';
import { EMOTION_BOOTSTRAP_BREAKPOINTS } from '../../constants/designTokens';

const Circle = styled.span`
  flex-shrink: 0;
  cursor: pointer;
  position: relative;
  display: inline-block;
  transition: all 0.15s ease-out;
  border-radius: 50%;
  background-color: ${({ color, theme }) =>
    color && theme.colors[color] ? theme.colors[color] : theme.colors.blue};

  width: ${({ size }) => 0.65 * size}px;
  height: ${({ size }) => 0.65 * size}px;
  ${EMOTION_BOOTSTRAP_BREAKPOINTS.md} {
    width: ${({ size }) => 0.8 * size}px;
    height: ${({ size }) => 0.8 * size}px;
  }
  ${EMOTION_BOOTSTRAP_BREAKPOINTS.lg} {
    width: ${({ size }) => size}px;
    height: ${({ size }) => size}px;
  }
`;

const Container = styled(Link)`
  position: relative;
  display: flex;
  justify-content: center;
  box-sizing: border-box;
  align-items: center;
  text-transform: capitalize;
  text-align: center;
  width: ${({ size }) => 0.65 * size}px;
  height: ${({ size }) => 0.65 * size}px;
  &.active {
    ${Circle} {
      background-color: white;
      border: 1px solid
        ${({ color, theme }) =>
          color && theme.colors[color] ? theme.colors[color] : theme.colors.blue};
      ::after {
        position: absolute;
        background-color: ${({ color, theme }) =>
          color && theme.colors[color] ? theme.colors[color] : theme.colors.blue};
        content: '';
        width: 45%;
        height: 45%;
        opacity: 0.75;
        border-radius: 50%;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        pointer-events: none;
      }
    }
  }
  ${EMOTION_BOOTSTRAP_BREAKPOINTS.md} {
    width: ${({ size }) => 0.8 * size}px;
    height: ${({ size }) => 0.8 * size}px;
  }
  ${EMOTION_BOOTSTRAP_BREAKPOINTS.lg} {
    width: ${({ size }) => size}px;
    height: ${({ size }) => size}px;
  }
  ${'' /* ${Circle} {
    :last-of-type::after,
    :first-of-type::after {
      position: absolute;
      background-color: white;
      content: '';
      width: 45%;
      height: 45%;
      opacity: 0.75;
      border-radius: 50%;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      pointer-events: none;
    }
  } */}
`;

const stationVariants = ['up', 'down'];

const Name = styled.span`
  position: absolute;
  overflow-wrap: initial;
  top: ${({ variant }) => (variant === 'up' ? `initial` : `50%`)};
  left: 50%;
  bottom: ${({ variant }) => (variant === 'down' ? `initial` : `50%`)};
  transform: ${({ variant, size }) =>
      variant === 'up' ? `translateY(-${size - 10}px)` : `translateY(${size - 10}px)`}
    translateX(-50%);
  color: ${({ theme }) => theme.colors.darkgrey};
  font-size: ${({ fontSize }) => 0.8 * fontSize}px;
  width: 75px;
  word-wrap: keep-all;
  ${EMOTION_BOOTSTRAP_BREAKPOINTS.lg} {
    width: 150px;
    font-size: ${({ fontSize }) => fontSize}px;
  }
`;

const AuxillaryField = styled.span`
  position: absolute;
  top: ${({ variant }) => (variant === 'down' ? `initial` : `50%`)};
  left: 50%;
  bottom: ${({ variant }) => (variant === 'up' ? `initial` : `50%`)};
  transform: ${({ variant, size }) =>
      variant === 'down' ? `translateY(-${size - 10}px)` : `translateY(${size - 10}px)`}
    translateX(-50%);
`;

export const Station = ({ name, variant, color, size = 25, render, ...rest }) => {
  const fontSize = name.length > 24 ? 14 : 16;

  return (
    <Container size={size} activeClassName="active" {...rest}>
      <Circle color={color} size={size} />
      <Name variant={variant} fontSize={fontSize} size={size}>
        {isFunction(name) ? name() : name}
      </Name>{' '}
      {render && (
        <AuxillaryField variant={variant} size={size}>
          {render()}
        </AuxillaryField>
      )}
    </Container>
  );
};

Station.propTypes = {
  name: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  variant: PropTypes.oneOf(stationVariants),
  color: PropTypes.string,
  size: PropTypes.number,
  render: PropTypes.func,
  to: PropTypes.string,
};

Station.defaultProps = {
  variant: 'up',
};

export { JourneyMap } from './JourneyMap';
export { SubwayLegend } from './Legend';
export { JunctionList } from './JunctionList';
export { SubwayLine } from './SubwayLine';
