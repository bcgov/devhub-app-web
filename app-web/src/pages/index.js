import React from 'react';
// local components
import NavigationalItems from '../components/Navigation/NavigationalItems/NavigationalItems';
import links from '../mainNavigation';
import { GITHUB_ISSUES_ROUTE } from '../constants/routes';

const Index = () => (
  <main role="main" className="main">
    <h1>Welcome</h1>
    <h2>
      <em>We are here to help</em>
    </h2>
    <p className="para">
      This is the front door to the developer community of the BC Government.
      We’re embarking on a journey to help developers learn new skills, discover
      resources and create amazing applications for government.
    </p>
    <p className="para">
      This is our first release and we’re planning to have new material added to
      this site every sprint (2 weeks), so please visit often to check our
      progress.
    </p>
    <p className="para">
      {' '}
      If you’d like to comment, offer a suggestion or ask a question you can
      find us by opening an issue in our{' '}
      <a href={GITHUB_ISSUES_ROUTE}>github.com</a> repository.
    </p>
    <NavigationalItems navItems={links} />
  </main>
);
export default Index;
