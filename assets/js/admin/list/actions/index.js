import { EDIT_POST, DELETE_POST, FETCH_POST } from './types';
import axios from 'axios';

const apiUrl = 'http://localhost/api/posts';

export const updatePost = ({id, title, searchkeys, body, price, image }) => {
  return (dispatch) => {
    return axios.put(`${apiUrl}/${id}`, {id, title, searchkeys, body, price, image })
      .then(response => {
        dispatch(updatePostSuccess(response.data))
      })
      .catch(error => {
        throw(error);
      });
  };
};

export const updatePostSuccess =  (data) => {
  return {
    type: EDIT_POST,
    payload: {
      id: data.id,
      title: data.title,
      searchkeys: data.searchkeys,
      body: data.body,
      price: data.price,
      image: data.image
    }
  }
};

export const deletePostSuccess = id => {
  return {
    type: DELETE_POST,
    payload: {
      id
    }
  }
}

export const deletePost = id => {
  return (dispatch) => {
    return axios.delete(`${apiUrl}/${id}`)
      .then(response => {
        dispatch(deletePostSuccess(id))
      })
      .catch(error => {
        throw(error);
      });
  };
};

export const fetchPosts = (posts) => {
  return {
    type: FETCH_POST,
    posts
  }
};

export const fetchAllPosts = () => {
  return (dispatch) => {
    return axios.get(apiUrl)
      .then(response => {
        dispatch(fetchPosts(response.data["hydra:member"]))
      })
      .catch(error => {
        throw(error);
      });
  };
};
