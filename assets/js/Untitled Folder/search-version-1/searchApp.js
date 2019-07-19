import React from 'react';
import axios from 'axios';

import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';

const apiUrl = 'http://localhost:8000/api/posts?title=';
//const apiUrl = "https://jsonplaceholder.typicode.com/users";

class App2 extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isSubmited: false,
      filterText: '',
      data: []
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event){
     this.setState({
       filterText: event.target.value
     })
  }

  handleSubmit(event){

    const searchTerm = this.state.filterText;

    axios.get(`${apiUrl}${searchTerm}`)
      .then(response => {
        this.setState({
          isSubmited: true,
          data: response.data["hydra:member"]
        })
      })
      .catch(error => {
        throw(error);
      });

      event.preventDefault();
  }

  render() {
    //alert("view rending");
    const isSubmited = this.state.isSubmited;
    let table;

    if (isSubmited) {
      content = <TABLE {...this.state}/>;
    } else {
      content = <div></div>;
    }

    return (
      <div className="container">
        <SearchBar filterText={this.state.filterText} onChange={this.handleChange} onSubmit={this.handleSubmit}/>
        {content}
      </div>
    );
  }
}

const SearchBar =  ({
  filterText,
  onChange,
  onSubmit
}) => <form onSubmit={onSubmit}>
  <div className="form-group row">
    <div className="col-xs-6 col-md-4">
      <input
        type="text"
        value={filterText}
        onChange={onChange}
        className="form-control"
      />
    </div>
    <div className="col-md-2">
      <button type="submit" className="btn btn-primary">Search</button>
    </div>

  </div>
</form>

//<input type="search" placeholder="search" value={this.props.filterText} onChange={this.props.onUserInput}/>

const TABLE = ({
  data
}) => <table id="tab" className="table table-striped">
    <thead><tr><th>Id</th><th>Title</th><th>Body</th></tr></thead>
    <tbody>{data.map((item, i) => <ROW key = {i} post = {item}/>)}</tbody>
   </table>

const ROW = ({
  post
}) => <tr><td>{post.id}</td><td>{post.title}</td><td>{post.body}</td></tr>


export default App2;
