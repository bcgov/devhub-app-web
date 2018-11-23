import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from '../components/UI/Link/Link';
import { faSadTear } from '@fortawesome/free-solid-svg-icons';

const styles = {
  fontSize: '40px',
  textAlign: 'center',
  padding: '10px',
};

const NotFound = ({ location }) => (
  <div style={styles}>
    <h1>
      404 <FontAwesomeIcon icon={faSadTear} aria-label="location not found" />
    </h1>
    <p>
      This is not the web page you are looking for. <Link to="/">Back Home</Link>.
    </p>
  </div>
);

export default NotFound;
