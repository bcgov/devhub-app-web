import ReactDOM from 'react-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import * as Icons from '@fortawesome/free-solid-svg-icons';
const iconsToUse = [
  Icons.faBook,
  Icons.faShippingFast,
  Icons.faCoffee,
  Icons.faUserAstronaut,
];

export default library.add.apply(library, iconsToUse);
