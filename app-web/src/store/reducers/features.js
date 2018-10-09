import { createFlagsReducer } from 'flag';
// flags can be booleans or functions as per flag docs
// https://www.npmjs.com/package/flag
// there are referenced by the Flag Component using string dot notation
export default createFlagsReducer({
    features: {
      login: false,
    },
});
