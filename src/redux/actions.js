// actions.js
import axios from 'axios';
import { FETCH_POSTS, CREATE_POST, UPDATE_POST, DELETE_POST, INCREMENT, DECREMENT } from './actionTypes';

const apiUrl = 'https://jsonplaceholder.typicode.com/posts';

export const fetchPosts = () => {
    return dispatch => {
        axios.get(apiUrl)
            .then(response => {
                dispatch({
                    type: FETCH_POSTS,
                    payload: response.data
                });
            })
            .catch(error => {
                console.error('Error fetching posts:', error);
            });
    };
};

export const createPost = (post) => {
    return dispatch => {
        axios.post(apiUrl, post)
            .then(response => {
                dispatch({
                    type: CREATE_POST,
                    payload: response.data
                });
            })
            .catch(error => {
                console.error('Error creating post:', error);
            });
    };
};

export const updatePost = (post) => {
    return dispatch => {
        axios.put(`${apiUrl}/${post.id}`, post)
            .then(response => {
                dispatch({
                    type: UPDATE_POST,
                    payload: response.data
                });
            })
            .catch(error => {
                console.error('Error updating post:', error);
            });
    };
};

export const deletePost = (id) => {
    return dispatch => {
        axios.delete(`${apiUrl}/${id}`)
            .then(() => {
                dispatch({
                    type: DELETE_POST,
                    payload: id
                });
            })
            .catch(error => {
                console.error('Error deleting post:', error);
            });
    };
};


export const increment = () => ({
    type: INCREMENT
});

export const decrement = () => ({
    type: DECREMENT
})