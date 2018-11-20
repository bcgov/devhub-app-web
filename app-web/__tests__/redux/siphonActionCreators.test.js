import * as actions from '../../src/store/actions/actions';
import { ACTIONS } from '../../__fixtures__/redux-fixtures';

describe('actions', () => {
  it('should create an action to load siphon nodes', () => {
    const expected = ACTIONS.LOAD_SIPHON_NODES;
    expect(actions.loadSiphonNodes(ACTIONS.LOAD_SIPHON_NODES.payload.nodes)).toEqual(expected);
  });

  it('should create an action to filter siphon nodes', () => {
    const expected = ACTIONS.FILTER_SIPHON_NODES;
    expect(actions.filterSiphonNodes('foo', 'bar')).toEqual(expected);
  });
});
