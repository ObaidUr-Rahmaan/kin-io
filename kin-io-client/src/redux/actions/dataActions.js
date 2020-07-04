import {
  SET_POSTS,
  LOADING_DATA,
  LIKE_POST,
  UNLIKE_POST,
  DELETE_POST,
} from "../types";
import axios from "axios";

// Get all posts
export const getPosts = () => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .get("/posts")
    .then((result) => {
      dispatch({
        type: SET_POSTS,
        payload: result.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: SET_POSTS,
        payload: [],
      });
    });
};

// Like a post
export const likePost = (postId) => (dispatch) => {
  axios
    .get(`/post/${postId}/like`)
    .then((result) => {
      dispatch({
        type: LIKE_POST,
        payload: result.data,
      });
    })
    .catch((err) => console.log(err));
};
// Unlike a scream
export const unlikePost = (postId) => (dispatch) => {
  axios
    .get(`/post/${postId}/unlike`)
    .then((result) => {
      dispatch({
        type: UNLIKE_POST,
        payload: result.data,
      });
    })
    .catch((err) => console.log(err));
};

export const deletePost = (postId) => (dispatch) => {
  axios
    .delete(`/post/${postId}`)
    .then(() => {
      dispatch({ type: DELETE_POST, payload: postId });
    })
    .catch((err) => console.log(err));
};
