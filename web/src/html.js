import React from 'react';
import { withPrefix } from 'gatsby';

let stylesStr;
if (process.env.NODE_ENV === 'production') {
  try {
    stylesStr = require('!raw-loader!../public/styles.css'); // eslint-disable-line
  } catch (e) {}
}

class HTML extends React.Component {
  render() {
    let css;
    if (process.env.NODE_ENV === 'production') {
      css = <style id="gatsby-inlined-css" dangerouslySetInnerHTML={{ __html: stylesStr }} />;
    }
    return (
      <html {...this.props.htmlAttributes}>
        <head>
          <title>DevHub</title>
          <meta
            name="description"
            content="DevHub aims to become the &#34;Central Nervous System&#34; for the growing BC Gov developer community."
          />
          <meta name="twitter:author" content="patricksimonian" />
          <meta name="robots" content="noindex" />
          <meta
            name="twitter:description"
            content="DevHub aims to become the &#34;Central Nervous System&#34; for the growing BC Gov developer community."
          />
          <meta name="twitter:image" content={withPrefix('/images/gov-logo-static.png')} />
          <meta name="og:author" content="patricksimonian" />
          <meta
            name="og:description"
            content="DevHub aims to become the &#34;Central Nervous System&#34; for the growing BC Gov developer community."
          />
          <meta name="og:image" content={withPrefix('/images/gov-logo-static.png')} />
          <meta charSet="utf-8" />
          <meta httpEquiv="x-ua-compatible" content="ie=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
          <link
            rel="stylesheet"
            href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css"
            integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO"
            crossOrigin="anonymous"
          />
          <link href={withPrefix('/images/favicon.ico')} rel="icon" type="image/x-icon" />
          {this.props.headComponents}
          {css}
          {/* inject typography styles lower in the head to over ride bootstrap styles */}
          {/* https://github.com/KyleAMathews/typography.js/blob/master/packages/typography/src/index.js#L72 */}
          <style id="typography.js" />
        </head>
        <body {...this.props.bodyAttributes}>
          {this.props.preBodyComponents}
          <noscript key="noscript" id="gatsby-noscript">
            This app works best with JavaScript enabled.
          </noscript>
          <div key={'body'} id="___gatsby" dangerouslySetInnerHTML={{ __html: this.props.body }} />
          {this.props.postBodyComponents}
        </body>
      </html>
    );
  }
}

export default HTML;
