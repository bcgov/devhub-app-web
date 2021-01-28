import React from 'react';

import { storiesOf } from '@storybook/react';
import { Source } from '../src/components/Form/Source';
import { Form } from 'react-final-form';

storiesOf('Content Contribution', module)
  .add('Web Form Section', () => (
    <Form onSubmit={() => null} render={() => <Source name="Foo" sourceType="web" />} />
  ))
  .add('Github Form Section', () => (
    <Form onSubmit={() => null} render={() => <Source name="Foo" sourceType="github" />} />
  ));
