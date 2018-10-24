import ReactDOM from 'react-dom'; // eslint-disable-line
import { library } from '@fortawesome/fontawesome-svg-core';
import * as Icons from '@fortawesome/free-solid-svg-icons';
import * as Brands from '@fortawesome/fontawesome-free-brands';

const iconsToUse = [
  Icons.faBook,
  Icons.faShippingFast,
  Icons.faCoffee,
  Icons.faUserAstronaut,
  Icons.faChevronRight,
  Brands.faGithub
];
// eslint-disable-next-line
export default library.add.apply(library, iconsToUse);

