import React from 'react';

import { storiesOf } from '@storybook/react';
import {
  Container,
  DecorativeBar,
  Title,
  CardBody,
  Description,
  BaseCard,
  ImageWrapper,
  Image,
} from '../src/components/Card';

import CardHeader from '../src/components/Card/CardHeader';

storiesOf('Introduction', module).add('Start', () => (
  <p>
    Welcome to Storybook, it may be best to google Storybook to understand what it is and how it
    works. <br />
    That being said, the purpose of our storybook is to visually demonstrate/test components as well
    as show how they are created (code snippets). Please Note that all code snippets will show some
    boiler plate which includes any relevant providers and other higher order components
  </p>
));
storiesOf('Card Base Components', module)
  .add(' Container', () => <Container />)
  .add(' Decorative Bar', () => (
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
  .add('Card Header, no render props', () => <CardHeader resourceType="Components" />)
  .add('Card Header, no render props, links to external', () => (
    <CardHeader resourceType="Components" linksToExternal />
  ))
  .add('Card Header, using custom render prop', () => (
    <CardHeader
      resourceType="Github Issue"
      render={() => (
        <span style={{ marginLeft: '10px', borderBottom: '1px solid red' }}>
          this is a custom input <code>&lt;span&gt;</code>
        </span>
      )}
    />
  ))
  .add('Card Title (styled Dotdotdot component)', () => <Title>How to make awesome apps</Title>)
  .add('Card Description (styled Dotdotdot component)', () => (
    <Description>How to make awesome apps</Description>
  ))
  .add('CardImage with Image Wrapper', () => (
    <ImageWrapper>
      <Image src="https://placeimg.com/180/145/animals" />
    </ImageWrapper>
  ));

storiesOf('Card Composition', module)
  .add('Container with decorative bar', () => (
    <Container>
      <DecorativeBar color="purple" />
    </Container>
  ))
  .add('Header (not custom render prop)', () => (
    <Container>
      <DecorativeBar color="purple" />
      <CardHeader resourceType="Repositories" />
    </Container>
  ))
  .add('Header (using custom render prop)', () => (
    <Container>
      <DecorativeBar color="purple" />
      <CardHeader
        resourceType="Repositories"
        render={() => <span style={{ marginLeft: '10px' }}>repo: devhub-app-web</span>}
      />
    </Container>
  ))
  .add('With Title (using <CardBody>)', () => (
    <Container>
      <DecorativeBar color="purple" />
      <CardHeader
        resourceType="Repositories"
        render={() => <span style={{ marginLeft: '10px' }}>repo: devhub-app-web</span>}
      />
      <CardBody>
        <Title>App Crashes on startup occasionally when using npm run dev</Title>
      </CardBody>
    </Container>
  ))
  .add('With Description (using <CardBody>)', () => (
    <Container>
      <DecorativeBar color="purple" />
      <CardHeader
        resourceType="Repositories"
        render={() => <span style={{ marginLeft: '10px' }}>repo: devhub-app-web</span>}
      />
      <CardBody>
        <Title>App Crashes on startup occasionally when using npm run dev</Title>
        <Description>
          I'm having trouble running the app, it keeps crashing when running npm run dev
        </Description>
      </CardBody>
    </Container>
  ))
  .add('With Image Only (using <CardBody>)', () => (
    <Container>
      <DecorativeBar color="purple" />
      <CardHeader
        resourceType="Repositories"
        render={() => <span style={{ marginLeft: '10px' }}>repo: devhub-app-web</span>}
      />
      <CardBody>
        <Title>App Crashes on startup occasionally when using npm run dev</Title>
        <ImageWrapper>
          <Image src="https://placeimg.com/180/145/animals" />
        </ImageWrapper>
      </CardBody>
    </Container>
  ));

storiesOf('Base Card', module)
  .add('introduction', () => (
    <div style={{ maxWidth: '400px' }}>
      The base card component is the fundamental unit of what a card is. This would be:
      <ul>
        <li>A link container that links to the page the card references</li>
        <li>A UI container where the contents of the card lives in</li>
        <li>A colored bar that identifies what 'resource type' the card is</li>
      </ul>
    </div>
  ))
  .add('Base Card', () => <BaseCard resourceType="Components" link="https://google.com" />);
