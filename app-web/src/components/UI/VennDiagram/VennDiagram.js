import React from 'react';
import classes from './VennDiagram.module.css';
import Circle from '../Circle/Circle';


const VennDiagram = ({ location }) => (
    <div className={classes.venn_diagram}>
        <div>
            <Circle type="circle-first"><p>We missed something.</p></Circle>
            <Circle type="circle-second"><p>You mistyped.</p></Circle> 
            <p className={classes.center}>404 Error</p>
        </div>
        <div>
            <a href="">Take me home.</a>
            <div className={classes.venn}>
                <h2>Venn Diagram</h2>
                <p>A Venn diagram shows the relationship between a group of different things (a set) in a visual way. Using Venn diagrams allows children to sort data into two or three circles which overlap in the middle.  Each circle follows a certain rule, so any numbers or objects placed in the overlapping part (the intersection) follow both rules. The diagram is named after the British logician, John Venn.</p>
            </div>
        </div>
    </div>
);

export default VennDiagram;
