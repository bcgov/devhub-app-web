import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

const Container = styled.div`
  position: relative;
  width: 100px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-transform: capitalize;
  text-align: center;
`;

const stationVariants = ['up', 'down'];

const Circle = styled.span`
  flex-shrink: 0;
  position: relative;
  display: inline-block;
  transition: all 0.15s ease-out;
  border-radius: 50%;
  width: ${({ size }) => size}px;
  background-color: ${({ color, theme }) =>
    color && theme.colors[color] ? theme.colors[color] : theme.colors.blue};
  height: ${({ size }) => size}px;
  ::after {
    position: absolute;
    content: '';
    width: 90%;
    height: 90%;
    border-radius: 50%;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
`;

const Name = styled.span`
  position: absolute;
  width: 100%;
  padding-left: 5px;
  top: ${({ variant }) => (variant === 'up' ? `initial` : `50%`)};
  bottom: ${({ variant }) => (variant === 'down' ? `initial` : `50%`)};
  transform: ${({ variant, size }) =>
    variant === 'up' ? `translateY(-${size - 5}px)` : `translateY(${size - 5}px)`};
  color: ${({ theme }) => theme.colors.darkgrey};
`;

export const Station = ({ name, variant, color, size = 25, ...rest }) => {
  const fontSize = name.length > 24 ? 14 : 16;

  return (
    <Container data-name={name} {...rest}>
      <Name variant={variant} style={{ fontSize }} size={size}>
        {name}
      </Name>{' '}
      <Circle color={color} size={size} />
    </Container>
  );
};

Station.propTypes = {
  name: PropTypes.string,
  variant: PropTypes.oneOf(stationVariants),
  color: PropTypes.string,
  size: PropTypes.number,
};

Station.defaultProps = {
  variant: 'up',
};
