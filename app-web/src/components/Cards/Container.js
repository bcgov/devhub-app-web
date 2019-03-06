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
import styled from '@emotion/styled';
import { EMOTION_BOOTSTRAP_BREAKPOINTS } from '../../constants/ui';
// represet the grid container the card rows sit in
// 260 = 250 card width + 10 px margin left and right
const threeCardCol = `${270 * 3}px`;
const fourCardCol = `${270 * 4}px`;
const Container = styled.div`
  display: flex;
  flex-flow: column nowrap;
  width: 100%;
  max-width: ${prop => {
    switch (prop.grid) {
      case 3:
        // three card grid
        return threeCardCol;
      default:
        return fourCardCol;
    }
  }};
  margin-bottom: 20px;
  ${EMOTION_BOOTSTRAP_BREAKPOINTS.sm} {
    margin-bottom: 15px;
    max-width: ${threeCardCol};
  }
  ${EMOTION_BOOTSTRAP_BREAKPOINTS.md} {
    margin-bottom: 15px;
    max-width: ${prop => {
      switch (prop.grid) {
        case 3:
          // three card grid
          return threeCardCol;
        default:
          return fourCardCol;
      }
    }};
  }
`;

export default Container;
