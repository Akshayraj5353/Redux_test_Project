// reducers.js
import { combineReducers } from 'redux';
import postReducer from './PostReducers'; 
import counterReducer from './CounterReducer'; 

const rootReducer = combineReducers({
    posts: postReducer,
    counter: counterReducer
});

export default rootReducer;
