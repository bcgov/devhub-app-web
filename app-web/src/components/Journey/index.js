import React from 'react';
import { Link } from '../UI/Link';
import { ResourceTypeIcon } from '../UI/ResourceTypeIcon';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import isFunction from 'lodash/isFunction';

const Container = styled(Link)`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  text-transform: capitalize;
  text-align: center;
`;

const stationVariants = ['up', 'down'];

const Circle = styled.span`
  flex-shrink: 0;
  cursor: pointer;
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
  width: 150px;
  top: ${({ variant }) => (variant === 'up' ? `initial` : `50%`)};
  left: 50%;
  bottom: ${({ variant }) => (variant === 'down' ? `initial` : `50%`)};
  transform: ${({ variant, size }) =>
      variant === 'up' ? `translateY(-${size - 5}px)` : `translateY(${size - 5}px)`}
    translateX(-50%);
  color: ${({ theme }) => theme.colors.darkgrey};
`;

const AuxillaryField = styled.span`
  position: absolute;
  top: ${({ variant }) => (variant === 'down' ? `initial` : `50%`)};
  left: 50%;
  bottom: ${({ variant }) => (variant === 'up' ? `initial` : `50%`)};
  transform: ${({ variant, size }) =>
      variant === 'down' ? `translateY(-${size - 5}px)` : `translateY(${size - 5}px)`}
    translateX(-50%);
`;

export const Station = ({ name, variant, color, size = 25, render, ...rest }) => {
  const fontSize = name.length > 24 ? 14 : 16;

  return (
    <Container {...rest}>
      <Circle color={color} size={size} />
      <Name variant={variant} style={{ fontSize }} size={size}>
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

const Line = styled.div`
  height: ${({ size }) => 0.5 * size}px;
  width: calc(100% - ${({ size }) => size}px);
  position: absolute;
  top: 50%;
  transform: translateY(-50%) translateX(${({ size }) => size * 0.5}px);
  background-color: ${({ color, theme }) =>
    color && theme.colors[color] ? theme.colors[color] : theme.colors.blue};
`;

const Subway = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  padding: 100px 0;
  justify-content: space-between;
`;

export const SubwayLine = ({ stops, color, size = 25 }) => (
  <Subway>
    <Line color={color} size={size} />
    {stops.map((stop, index) => {
      const variant = index % 2 === 0 ? 'up' : 'down';
      const extraProps = {};
      if (stop.connections) {
        extraProps.render = () => (
          <JunctionList
            variant={variant === 'up' ? 'down' : 'up'}
            style={{ transform: 'translateX(calc(50% - 2px))' }}
            links={stop.connections.map(({ name, path, resourceType }) => ({
              name,
              to: path,
              resourceType,
            }))}
          />
        );
      }

      return (
        <Station
          key={stop.name}
          name={stop.name}
          size={size}
          variant={variant}
          color={color}
          href={stop.to}
          {...extraProps}
        />
      );
    })}
  </Subway>
);

SubwayLine.propTypes = {
  stops: PropTypes.arrayOf(PropTypes.shape({ name: PropTypes.string })),
  color: PropTypes.string,
  size: PropTypes.number,
};

const JunctionContainer = styled.ul`
  margin: 5px 0;
  border-left: 2px solid ${({ theme }) => theme.colors.darkgrey};
  color: ${({ theme }) => theme.colors.darkgrey};
  font-size: 12px;
  font-weight: 400;
  border-top-left-radius: ${({ variant }) => (variant === 'up' ? '4px' : 0)};
  border-bottom-left-radius: ${({ variant }) => (variant === 'down' ? '4px' : 0)};
  padding: ${({ variant }) => (variant === 'down' ? '4px 0 0 4px' : '0 0 4px 4px')};
  list-style: none;
  li {
    margin: 6px 0;

    transform: ${({ variant }) => (variant === 'up' ? 'translateY(-0.5em)' : 'translateY(0.5em)')};
    display: flex;
    align-items: flex-end;
    justify-content: flex-start;
    text-align: left;
    a {
      max-width: 150px;
      flex: 1 0 auto;
      color: ${({ theme }) => theme.colors.lightblue};
    }
  }
`;

export const JunctionList = ({ links, variant, ...rest }) => {
  return (
    <JunctionContainer variant={variant} {...rest}>
      {links.map(l => (
        <li key={l.to}>
          <span>
            ─&nbsp;
            <ResourceTypeIcon type={l.resourceType} style={{ marginRight: '4px' }} />
          </span>
          <Link to={l.to}>{l.name}</Link>
        </li>
      ))}
    </JunctionContainer>
  );
};

JunctionList.propTypes = {
  links: PropTypes.arrayOf(PropTypes.shape({ name: PropTypes.string, to: PropTypes.string })),
  variant: PropTypes.oneOf(stationVariants),
};

JunctionList.defaultProps = {
  variant: 'up',
};
