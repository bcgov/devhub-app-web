import React from 'react';
import { withPrefix } from 'gatsby';

let stylesStr;
if (process.env.NODE_ENV === 'production') {
  try {
    stylesStr = require('!raw-loader!../public/styles.css'); // eslint-disable-line
  } catch (e) {
    console.log(e);
  }
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
          <meta name="twitter:author" content="patricksimonian" />
          <meta
            name="twitter:description"
            content="DevHub aims to become the &#34;Central Nervous System&#34; for the growing BC Gov developer community."
          />
          <meta name="twitter:image" content={withPrefix('/images/connected.png')} />
          <meta name="og:author" content="patricksimonian" />
          <meta
            name="og:description"
            content="DevHub aims to become the &#34;Central Nervous System&#34; for the growing BC Gov developer community."
          />
          <meta name="og:image" content={withPrefix('/images/connected.png')} />
          <meta charSet="utf-8" />
          <meta httpEquiv="x-ua-compatible" content="ie=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
          <link
            href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.1.3/css/bootstrap-reboot.min.css"
            rel="stylesheet"
          />
          <link
            rel="stylesheet"
            href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css"
            integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO"
            crossOrigin="anonymous"
          />
          <link href="https://fonts.googleapis.com/css?family=Noto+Sans:400,700" rel="stylesheet" />
          <link
            href="https://portal.nrs.gov.bc.ca/nrs-portal-theme/images/favicon.ico"
            rel="icon"
            type="image/x-icon"
          />
          {this.props.headComponents}
          {css}
        </head>
        <body {...this.props.bodyAttributes}>
          {this.props.preBodyComponents}
          <div key={'body'} id="___gatsby" dangerouslySetInnerHTML={{ __html: this.props.body }} />
          {this.props.postBodyComponents}
        </body>
      </html>
    );
  }
}

export default HTML;
