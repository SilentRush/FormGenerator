import { combineReducers } from 'redux';

// Reducers
import formReducer from './form-reducer';

// Combine Reducers
var reducers = combineReducers({
    formState: formReducer
});

export default reducers;
