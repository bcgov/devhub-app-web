import React from 'react';

import { storiesOf } from '@storybook/react';
import { Container, DecorativeBar } from '../src/components/Card';

storiesOf('Cards', module)
  .add('Base Card Components: Container', () => <Container />)
  .add('Base Card Components: Decorative Bar', () => (
    <React.Fragment>
      red
      <DecorativeBar color="red" />
      babyblue
      <DecorativeBar color="babyblue" />
      light yellow
      <DecorativeBar color="lightyellow" />
      purple
      <DecorativeBar color="purple" />
      resource type Topics
      <DecorativeBar color="Topics" />
      resource type Events
      <DecorativeBar color="Events" />
    </React.Fragment>
  ))
  .add('Base Card Components: Container', () => <Container />)
  .add('Base Card Components: Container', () => <Container />);
