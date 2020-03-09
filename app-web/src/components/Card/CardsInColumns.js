/*
Copyright 2019 Province of British Columbia

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at 

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

Created by Patrick Simonian
*/
import React from 'react';
import PropTypes from 'prop-types';
import Col from './Column';
import Card from './Card';

const CardsInColumns = ({ cards }) => {
  return cards.map(card => (
    <Col
      key={card.id}
      style={{
        justifyContent: 'center',
        display: 'flex',
      }}
    >
      <Card
        resourceType={card.fields.resourceType}
        title={card.fields.title}
        description={card.fields.description}
        image={card.fields.image}
        link={card.fields.standAlonePath}
        event={card}
        data-resourcetype={card.fields.resourceType}
      />
    </Col>
  ));
};

CardsInColumns.propTypes = {
  cards: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      fields: PropTypes.shape({
        resourceType: PropTypes.string,
        title: PropTypes.string,
        description: PropTypes.string,
        image: PropTypes.string,
        link: PropTypes.string,
      }),
    }),
  ),
};

export default React.memo(CardsInColumns);
