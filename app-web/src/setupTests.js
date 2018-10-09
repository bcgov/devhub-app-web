// configuring enzyme to use the adapter for React 16
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

// mock out graph ql
global.graphql = jest.fn();

export default Enzyme.configure({ adapter: new Adapter() });
