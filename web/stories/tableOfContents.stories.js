import React from 'react';

import { storiesOf } from '@storybook/react';
import TableOfContents, {
  TableOfContentsToggle,
} from '../src/components/TableOfContents/TableOfContents';

const contents = [
  {
    title: 'Foo',
    resourceType: 'Documentation',
    path: '/foo',
  },
  {
    title: 'External Foo',
    resourceType: 'Components',
    path: 'https://external.foo',
  },
];
storiesOf('Table of Contents', module)
  .add('Toggle Switch', () => <TableOfContentsToggle />)
  .add('Table of Contents for a topic', () => (
    <TableOfContents title="Topic" contents={contents} />
  ));
