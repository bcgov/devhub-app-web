/*
Copyright 2019 Province of British Columbia

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
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { EMOTION_BOOTSTRAP_BREAKPOINTS } from '../../constants/designTokens';
import { JunctionList } from './JunctionList';
import { Station } from '.';

const Subway = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  padding: 100px 60px;
  min-width: 615px;
  justify-content: space-between;
  ${EMOTION_BOOTSTRAP_BREAKPOINTS.md} {
    padding: 130px 60px;
  }
`;

const Line = styled.div`
  height: ${({ size }) => 0.35 * size}px;
  ${EMOTION_BOOTSTRAP_BREAKPOINTS.md} {
    height: ${({ size }) => 0.4 * size}px;
  }
  ${EMOTION_BOOTSTRAP_BREAKPOINTS.lg} {
    height: ${({ size }) => 0.5 * size}px;
  }
  width: calc(100% - ${({ size }) => size}px - 120px);
  position: absolute;
  top: 50%;
  transform: translateY(-50%) translateX(${({ size }) => size * 0.5}px);
  background-color: ${({ color, theme }) =>
    color && theme.colors[color] ? theme.colors[color] : theme.colors.blue};
`;

export const SubwayLine = ({ stops, color, size = 25, ...rest }) => (
  <Subway {...rest}>
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
          to={stop.to}
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
