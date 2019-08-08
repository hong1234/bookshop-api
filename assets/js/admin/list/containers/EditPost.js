import { connect } from 'react-redux';
import { updatePost } from '../actions';
import UpdatePost from '../components/UpdatePost';

const mapDispatchToProps = dispatch => {
  return {
    onAddPost: post => {
      dispatch(updatePost(post));
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(UpdatePost);
