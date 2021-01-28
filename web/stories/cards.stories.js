import React from 'react';

import { storiesOf } from '@storybook/react';
import {
  Container,
  DecorativeBar,
  Title,
  CardBody,
  Card,
  Description,
  BaseCard,
  ImageWrapper,
  Image,
} from '../src/components/Card';

import CardHeader from '../src/components/Card/CardHeader';
import { EventCard } from '../src/components/Card/Card';

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
      <CardBody>
        <CardHeader resourceType="Repositories" />
      </CardBody>
    </Container>
  ))
  .add('Header (using custom render prop)', () => (
    <Container>
      <DecorativeBar color="purple" />
      <CardBody>
        <CardHeader
          resourceType="Repositories"
          render={() => <span style={{ marginLeft: '10px' }}>repo: devhub-app-web</span>}
        />
      </CardBody>
    </Container>
  ))
  .add('With Title (using <CardBody>)', () => (
    <Container>
      <DecorativeBar color="purple" />
      <CardBody>
        <CardHeader
          resourceType="Repositories"
          render={() => <span style={{ marginLeft: '10px' }}>repo: devhub-app-web</span>}
        />
        <Title>App Crashes on startup occasionally when using npm run dev</Title>
      </CardBody>
    </Container>
  ))
  .add('With Description (using <CardBody>)', () => (
    <Container>
      <DecorativeBar color="purple" />
      <CardBody>
        <CardHeader
          resourceType="Repositories"
          render={() => <span style={{ marginLeft: '10px' }}>repo: devhub-app-web</span>}
        />
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
      <CardBody>
        <CardHeader
          resourceType="Repositories"
          render={() => <span style={{ marginLeft: '10px' }}>repo: devhub-app-web</span>}
        />
        <Title>App Crashes on startup occasionally when using npm run dev</Title>
        <ImageWrapper>
          <Image src="https://placeimg.com/180/145/animals" />
        </ImageWrapper>
      </CardBody>
    </Container>
  ));

storiesOf('Base Card', module)
  .add('Introduction', () => (
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

storiesOf('Prebuilt Card Components', module)
  .add('Introduction', () => (
    <div style={{ maxWidth: '400px' }}>
      The Prebuilt Card Components are ones to be leveraged within the applications. They are built
      from all the base components as described within this storybook. The{' '}
      <code>&lt;Card /&gt;</code> component will render different variants based on the props your
      provide
    </div>
  ))
  .add('Regular Card (basic variant)', () => (
    <Card
      resourceType="Github Issue"
      link="http://localhost:8080"
      title="App Crashes on startup occasionally when using npm run dev"
      description=" I'm having trouble running the app, it keeps crashing when running npm run dev"
    />
  ))
  .add('Regular Card (image only variant)', () => (
    <Card
      resourceType="Github Issue"
      link="http://localhost:8080"
      title="App Crashes on startup occasionally when using npm run dev"
      image="https://placeimg.com/180/145/animals"
    />
  ))
  .add('Regular Card (image and desc variant)', () => (
    <Card
      resourceType="Github Issue"
      link="http://localhost:8080"
      title="App Crashes on startup occasionally when using npm run dev"
      image="https://placeimg.com/180/145/animals"
      description=" I'm having trouble running the app, it keeps crashing when running npm run dev"
    />
  ))
  .add('Card with custom body', () => (
    <Card
      resourceType="Documentation"
      link="http://localhost:8080"
      renderBody={() => (
        <div style={{ overflow: 'auto' }}>
          <ul>
            <li>Milk</li>
            <li>Eggs</li>
            <li>
              How to be an adult <i>version 4</i>
            </li>
          </ul>
        </div>
      )}
      title="Groceries"
    />
  ))
  .add('Regular Card (eventbrite variant)', () => (
    <Card
      resourceType="Events"
      link="http://localhost:8080"
      description="foo foo foo"
      event={{
        start: {
          day: '8',
          month: 'Jan',
          year: '2020',
        },
        end: {
          day: '8',
          month: 'Jan',
          year: '2020',
        },

        venue: 'Exchange Lab',
      }}
      title="Groceries"
      image="eventbrite"
    />
  ))
  .add('Card with custom header', () => (
    <Card
      resourceType="Documentation"
      link="http://localhost:8080"
      renderHeader={() => <small>Shopping Lists</small>}
      renderBody={() => (
        <div style={{ overflow: 'auto' }}>
          <ul>
            <li>Milk</li>
            <li>Eggs</li>
            <li>
              How to be an adult <i>version 4</i>
            </li>
          </ul>
        </div>
      )}
      title="Groceries"
    />
  ))
  .add('Event Card (event brite)', () => (
    <EventCard
      title="Pat's Bday Bash"
      description="It's gona be a pinata party. yay."
      event={{
        start: {
          day: '8',
          month: 'Jan',
          year: '2020',
        },
        venue: 'Exchange Lab',
      }}
      image="eventbrite"
      link="localhost:6006"
    />
  ));
