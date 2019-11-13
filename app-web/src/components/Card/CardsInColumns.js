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

export const CardsInColumns = ({ cards }) => {
  cards.map(r => (
    <Col
      key={r.id}
      style={{
        justifyContent: 'center',
        display: 'flex',
      }}
    >
      <Card
        resourceType={r.fields.resourceType}
        key={r.id}
        title={r.fields.title}
        description={r.fields.description}
        image={r.fields.image}
        link={r.fields.standAlonePath}
        event={r}
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
