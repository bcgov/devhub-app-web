import React from 'react';
import Circle from '../Circle/Circle';
import Link from '../../UI/Link/Link';
import { HOME_ROUTE } from '../../../constants/routes';
import classes from './VennDiagram.module.css';

const VennDiagram = ({ location }) => (
  <main className={classes.Container}>
    <div className={classes.venn_diagram}>
      <Circle className={classes.circle_first}>
        <p>We missed something.</p>
      </Circle>
      <Circle className={classes.circle_second}>
        <p>You mistyped.</p>
        <p className={classes.center}>404 Error</p>
      </Circle>
    </div>
    <article className={classes.description}>
      <h2>Venn Diagram</h2>
      <p>
        A Venn diagram shows the relationship between a group of different things (a set) in a
        visual way. Using Venn diagrams allows children to sort data into two or three circles which
        overlap in the middle. Each circle follows a certain rule, so any numbers or objects placed
        in the overlapping part (the intersection) follow both rules. The diagram is named after the
        British logician, John Venn.
      </p>
      <p>
        <Link to={HOME_ROUTE}>Back Home</Link>
      </p>
    </article>
  </main>
);

export default VennDiagram;
