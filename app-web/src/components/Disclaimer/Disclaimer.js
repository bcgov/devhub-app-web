import React from 'react';
import PropTypes from 'prop-types';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { FAIR_USE_IMAGE_POLICY } from '../../messages';
import { Link } from '../UI/Link';
import Button from '../UI/Button/Button';
import { css } from '@emotion/core';

// ids are for test targeting
export const IDS = {
  disclaimer: 'disclaimer-modal',
  body: 'disclaimer-body',
};

const withNoCapitalize = css`
  text-transform: none;
`;

const Disclaimer = ({ onClose, open, toggle }) => {
  return (
    <Modal isOpen={open} toggle={toggle} id={IDS.disclaimer}>
      <ModalHeader tag="h2" toggle={toggle}>
        {FAIR_USE_IMAGE_POLICY.title.defaultMessage}
      </ModalHeader>
      <ModalBody id={IDS.body}>
        All third party trademarks (including logos and icons) referenced by developer.gov.bc.ca
        remain the property of their respective owners. Unless specifically identified as such,
        developer.gov.bc.ca use of third party trademarks does not indicate any relationship,
        sponsorship, or endorsement between The Province of British Columbia and the owners of these
        trademarks. All references by developer.gov.bc.ca to third party trademarks are to identify
        the corresponding third party goods and/or services and intended to constitute nominative
        fair use under applicable trademark laws. If you are a trademark holder and wish to have
        your intellectual property excluded from{' '}
        <Link css={withNoCapitalize} to="developer.gov.bc.ca">
          developer.gov.bc.ca
        </Link>{' '}
        please contact us at
        <Link css={withNoCapitalize} to="mailto:pathfinder@gov.bc.ca">
          pathfinder@gov.bc.ca
        </Link>
      </ModalBody>
      <ModalFooter>
        <Button type="primary" clicked={onClose}>
          Okay
        </Button>
      </ModalFooter>
    </Modal>
  );
};

Disclaimer.propTypes = {
  onClose: PropTypes.func.isRequired,
  toggle: PropTypes.func.isRequired,
  open: PropTypes.bool,
};

Disclaimer.defaultProps = {
  open: false,
};

export default Disclaimer;
