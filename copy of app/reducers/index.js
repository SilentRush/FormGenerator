import { combineReducers } from 'redux';

// Reducers
import calendarReducer from './calendar-reducer';

// Combine Reducers
var reducers = combineReducers({
    calendarState: calendarReducer
});

export default reducers;
