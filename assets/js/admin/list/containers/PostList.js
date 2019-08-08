import React from 'react';
import { connect } from 'react-redux';
import PostList from '../components/PostList';
import { fetchAllPosts, deletePost } from '../actions';

const mapStateToProps = state => {
  return {
    posts: state.posts
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onDelete: id => {
      dispatch(deletePost(id));
    },
    onLoading: () => {
      dispatch(fetchAllPosts())
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostList);
