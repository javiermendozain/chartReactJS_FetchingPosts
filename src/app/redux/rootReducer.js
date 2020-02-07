// Dependencies
import { combineReducers } from 'redux';

// Containers Reducers
import blogReducer from './reducers/blogReducer';

// Shared Reducers
import device from './reducers/deviceReducer';

const rootReducer = combineReducers({
  blogReducer,
  device
});

export default rootReducer;
