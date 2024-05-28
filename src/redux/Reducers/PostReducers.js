// reducers.js
import { FETCH_POSTS, CREATE_POST, UPDATE_POST, DELETE_POST } from '../actionTypes';

const initialState = {
    posts: []
};

const postReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_POSTS:
            return { ...state, posts: action.payload };
        case CREATE_POST:
            return { ...state, posts: [...state.posts, action.payload] };
        case UPDATE_POST:
            return {
                ...state,
                posts: state.posts.map(post => post.id === action.payload.id ? action.payload : post)
            };
        case DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter(post => post.id !== action.payload)
            };
        default:
            return state;
    }
};

export default postReducer;
