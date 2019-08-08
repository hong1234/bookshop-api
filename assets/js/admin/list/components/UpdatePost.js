import React from 'react';

class UpdatePost extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
        id: props.post.id,
        title: props.post.title,
        searchkeys: props.post.searchkeys,
        body: props.post.body,
        price: props.post.price,
        image: props.post.image
      };

   }

  handleInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.title.trim() && this.state.searchkeys.trim() && this.state.body.trim() && this.state.price.trim() && this.state.image.trim()) {
      this.props.onAddPost(this.state);
      this.handleReset();
      this.props.setEditStatus();
    }
  };

  handleReset = () => {
    this.setState({
      title: '',
      searchkeys: '',
      body: '',
      price: '',
      image: ''
    });
  };

  render() {
    return (
      <div>
          <form onSubmit={ this.handleSubmit }>
          <div className="form-group">
              <input
              type="text"
              placeholder="Title"
              className="form-control"
              name="title"
              onChange={ this.handleInputChange }
              value={ this.state.title }
            />
          </div>
          <div className="form-group">
              <input
              type="text"
              placeholder="Searchkeys"
              className="form-control"
              name="searchkeys"
              onChange={ this.handleInputChange }
              value={ this.state.searchkeys }
            />
          </div>
          <div className="form-group">
            <textarea
              cols="19"
              rows="8"
              placeholder="Body"
              className="form-control"
              name="body"
              onChange={ this.handleInputChange }
              value={ this.state.body }>
            </textarea>
          </div>
          <div className="form-group">
              <input
              type="text"
              placeholder="Price"
              className="form-control"
              name="price"
              onChange={ this.handleInputChange }
              value={ this.state.price }
            />
          </div>
          <div className="form-group">
              <input
              type="text"
              placeholder="Image"
              className="form-control"
              name="image"
              onChange={ this.handleInputChange }
              value={ this.state.image }
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-primary">Update Post</button>
            <button type="button" className="btn btn-warning" onClick={ this.handleReset }>Reset</button>
          </div>
        </form>
      </div>
    );
  }
}

export default UpdatePost;
