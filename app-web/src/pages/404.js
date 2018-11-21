import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from '../components/Common/Link';
import { faSadTear } from '@fortawesome/free-solid-svg-icons';
import VennDiagram from '../components/UI/VennDiagram/VennDiagram';


const NotFound = ({ location }) => (
  <div>
    <h1>404 Error - Page Not Found</h1>
    <VennDiagram />
  </div>
);

export default NotFound;
