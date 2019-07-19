import React from 'react';
import axios from 'axios';

import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';

const apiUrl = 'http://localhost:8000/api/posts?title=';
const apiUrl2 = 'http://localhost:8000/api/posts/';
//const apiUrl = "https://jsonplaceholder.typicode.com/users";

class Sapp extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      filterText: '',
      isSubmited: false,
      data: [],
      showDetail: false,
      itemData: {},
      showCart: false,
      cart: [],
      cartSum: 0
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDetail = this.handleDetail.bind(this);
    this.handleAddToCart = this.handleAddToCart.bind(this);
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

  handleDetail(current){
    this.setState({
      showDetail: true,
      itemData: this.state.data[current]
    })

    event.preventDefault();
  };

  handleAddToCart(){
    let temp = this.state.cart;
    let sum = this.state.cartSum;
    sum = sum + 33;
    temp.push(this.state.itemData);
    this.setState({
      showCart: true,
      cartSum: sum,
      cart: temp
    })

    event.preventDefault();
  };

  render() {
    //alert("view rending");
    const {isSubmited, showDetail, showCart} = this.state;
    let table;
    let detail;
    let cart;

    if (isSubmited) {
      content = <TABLE {...this.state} handleDetail={this.handleDetail}/>;
    } else {
      content = <div></div>;
    }

    if (showDetail) {
      const Item = this.state.itemData;
      const logo = `/image/${Item.body}`;
      detail = <Detail Item={Item} logo={logo} handleAddToCart={this.handleAddToCart}/> ;
    } else {
      detail = <div></div>;
    }

    if (showCart) {
      cart = <Cart cart={this.state.cart} sum={this.state.cartSum} handleAddToCart={this.handleAddToCart}/>;
    } else {
      cart = <div></div>;
    }

    return (
      <div>

        <div className="row">
          <h4 className="display-4">Hàng Việt Nam</h4>
        </div>

        <div className="row">
          <div className="col-xs-12 col-md-4">
            <SearchBar filterText={this.state.filterText} onChange={this.handleChange} onSubmit={this.handleSubmit}/>
          </div>
          <div className="col-xs-12 col-md-4">
            <h5 className="display-5">Chi tiết</h5>
          </div>
          <div className="col-xs-12 col-md-4">
            <h5 className="display-5">Giỏ hàng</h5>
          </div>
        </div>

        <div className="row">
          <div className="col-xs-12 col-md-4">
            <div>{content}</div>
          </div>
          <div className="col-xs-12 col-md-4">
            <div>{detail}</div>
          </div>
          <div className="col-xs-12 col-md-4">
            <div>{cart}</div>
          </div>
        </div>

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
    <div className="col-xs-8 col-md-6">
      <input
        type="text"
        value={filterText}
        onChange={onChange}
        className="form-control"
      />
    </div>
    <div className="col-xs-4 col-md-3">
      <button type="submit" className="btn btn-primary">Tìm</button>
    </div>
  </div>
</form>

const TABLE = ({ data, handleDetail }) => <table id="tab" className="table table-borderless table-sm">
  <thead><tr><th>Mã số</th><th>Mặt hàng</th></tr></thead>
  <tbody>
    { data.map((item, i) => <ROW key = {i} current={i} post = {item} handleDetail = {handleDetail}/>) }
  </tbody>
</table>

const ROW = ({ current, post, handleDetail }) => <tr>
  <td><b>{post.id}</b></td>
  <td><button id={post.id} onClick={() =>handleDetail(current)} type="button" className="btn btn-info"><b>{post.title}</b></button></td>
</tr>

const Detail = ({ Item, logo, handleAddToCart }) => <div>
  <div><b>{Item.id} - </b><b>{Item.title}</b></div>
  <div><button onClick={handleAddToCart} type="button" className="btn btn-info"><b>Add To Cart</b></button></div>
  <div><img src={logo} alt="Smiley face" className="rounded img-fluid"/></div>
</div>

const Cart = ({ cart, sum }) => <table className="table table-sm">
  <thead>
    <tr>
      <th scope="col">Mã số</th>
      <th scope="col">Mặt hàng</th>
    </tr>
  </thead>
  <tbody>
    { cart.map((item, i) => <tr key = {i}><th scope="row">{item.id}</th><td>{item.title}</td></tr>) }
    <tr><th scope="row">Sum</th><td><b>{sum}</b></td></tr>
  </tbody>
</table>


export default Sapp;
