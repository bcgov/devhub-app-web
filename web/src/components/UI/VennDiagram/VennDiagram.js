import React from 'react';
import Circle from '../Circle/Circle';
import Link from '../../UI/Link/Link';
import { HOME_ROUTE } from '../../../constants/routes';
import styled from '@emotion/styled';

const Container = styled.main`
  display: flex;
  padding: 25px 15px;
  align-items: center;
  flex-flow: row wrap;
  justify-content: space-around;
`;

const VennContainer = styled.div`
  position: relative;
  display: inline-block;
  p {
    color: #fff;
    font-size: 18px;
    margin: 1em 0;
    position: absolute;
    top: 50%;
    left: 50%;
  }
`;

const LeftCircle = styled(Circle)`
  position: relative;
  margin-right: 12vw;
  /* Permalink - use to edit and share this gradient: http://colorzilla.com/gradient-editor/#356aa0+0,2b4b7f+100 */
  background: #356aa0; /* Old browsers */
  background: -moz-radial-gradient(center, ellipse cover, #356aa0 0%, #2b4b7f 100%); /* FF3.6-15 */
  background: -webkit-radial-gradient(
    center,
    ellipse cover,
    #356aa0 0%,
    #2b4b7f 100%
  ); /* Chrome10-25,Safari5.1-6 */
  background: radial-gradient(
    ellipse at center,
    #356aa0 0%,
    #2b4b7f 100%
  ); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#356aa0', endColorstr='#2b4b7f',GradientType=1 ); /* IE6-9 fallback on horizontal gradient */
  p {
    transform: translate(-100%, -50%);
    padding-right: 5px;
    padding-left: 5px;
  }
`;

const RightCircle = styled(Circle)`
  position: absolute;
  transform: translateX(50%);
  top: 0;
  left: 0;
  /* Permalink - use to edit and share this gradient: http://colorzilla.com/gradient-editor/#627d4d+0,1f3b08+100;Olive+3D */
  background: #627d4d; /* Old browsers */
  background: -moz-radial-gradient(center, ellipse cover, #627d4d 0%, #1f3b08 100%); /* FF3.6-15 */
  background: -webkit-radial-gradient(
    center,
    ellipse cover,
    #627d4d 0%,
    #1f3b08 100%
  ); /* Chrome10-25,Safari5.1-6 */
  background: radial-gradient(
    ellipse at center,
    #627d4d 0%,
    #1f3b08 100%
  ); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#627d4d', endColorstr='#1f3b08',GradientType=1 ); /* IE6-9 fallback on horizontal gradient */
  p {
    transform: translate(0%, -50%);
    padding-left: 10px;
  }
`;

const Description = styled.article`
  flex-basis: 250px;
  flex-grow: 1;
  max-width: 450px;
  margin-left: 35px;
`;

const VennDiagram = () => (
  <Container>
    <VennContainer>
      <LeftCircle>
        <p>We missed something.</p>
      </LeftCircle>
      <RightCircle>
        <p>You mistyped.</p>
        <p
          style={{
            position: 'absolute',
            top: '50%',
            left: '25%',
            padding: '0',
            transform: 'translate(-50%, -50%)',
          }}
        >
          404 Error
        </p>
      </RightCircle>
    </VennContainer>
    <Description>
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
    </Description>
  </Container>
);

export default VennDiagram;
