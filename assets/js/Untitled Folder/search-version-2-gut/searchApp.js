import React from 'react';
import axios from 'axios';

import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';

const apiUrl = 'http://localhost:8000/api/posts?title=';
const apiUrl2 = 'http://localhost:8000/api/posts/';
//const apiUrl = "https://jsonplaceholder.typicode.com/users";

class App2 extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isSubmited: false,
      filterText: '',
      data: [],
      showDetail: false,
      showCrawl: {}
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCrawl = this.handleCrawl.bind(this);
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
          showDetail: false,
          data: response.data["hydra:member"]
        })
      })
      .catch(error => {
        throw(error);
      });

      event.preventDefault();
  }

  handleCrawl(e){
    const { id } = e.target;
    //alert(id);
    axios.get(`${apiUrl2}${id}`)
      .then(response => {
        this.setState({
          showDetail: true,
          showCrawl: response.data
        })
      })
      .catch(error => {
        throw(error);
      });
    event.preventDefault();
  };

  render() {
    //alert("view rending");
    const {isSubmited, showDetail} = this.state;
    let table;
    let detail;

    if (isSubmited) {
      content = <TABLE {...this.state} handleCrawl={this.handleCrawl}/>;
    } else {
      content = <div></div>;
    }

    if (showDetail) {
      const Crawl = this.state.showCrawl;
      detail = <div><div>{Crawl.id}</div><div>{Crawl.title}</div><div>{Crawl.body}</div></div>;
    } else {
      detail = <div></div>;
    }

    return (
      <div className="container">
        <SearchBar filterText={this.state.filterText} onChange={this.handleChange} onSubmit={this.handleSubmit}/>
        {content}
        {detail}
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

const TABLE = ({ data, handleCrawl }) => <table id="tab" className="table table-striped">
  <thead>
    <tr><th>Id</th><th>Title</th><th>Body</th></tr>
  </thead>
  <tbody>
    { data.map((item, i) => <ROW key = {i} post = {item} handleCrawl = {handleCrawl}/>) }
  </tbody>
</table>

const ROW = ({ key, post, handleCrawl }) => <tr>
  <td>{post.id}</td>
  <td><button value={key} id={post.id} onClick={handleCrawl} >{post.title}</button></td>
  <td>{post.body}</td>
</tr>

export default App2;
