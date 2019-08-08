import React from 'react';
import Post from './Post';

import EditPost from '../containers/EditPost';

class PostList extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
        edit: false,
        index: 0
      };
  }

  componentWillMount(){
    this.props.onLoading();
  }

  componentDidMount() {
    //this.props.onLoading();
  }

  setEditStatus = () => {
    this.setState({
      edit: false,
    });
  };

  onEdit = (id) => {
    this.setState({
      edit: true,
      index: this.props.posts.findIndex(post=>post.id === id)
    });
  };

  render() {
    //
    const { posts, onDelete } = this.props;

    if(this.state.edit) {
      return (
        <div>
          <EditPost setEditStatus={this.setEditStatus} post={posts[this.state.index]}/>
        </div>
      )
    }

    if(!posts.length) {
      return (
        <div>
          No Posts
        </div>
      )
    }

    return (

      <div>
        <div className="text-md-center"><h4>PRODUCTLIST</h4></div>
        {posts.map(post => <Post post={ post } onEdit={ this.onEdit } onDelete={ onDelete } key={ post.id } />)}
      </div>
    );
  }

}

export default PostList;
