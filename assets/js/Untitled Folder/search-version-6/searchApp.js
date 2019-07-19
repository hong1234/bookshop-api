import React from 'react';
import axios from 'axios';
import { v4 } from 'uuid';

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
    this.onDismiss = this.onDismiss.bind(this);
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
    let cart2 = this.state.cart;

    let item = { ...this.state.itemData };
    item.id2 = v4();

    //cart2.push(item);
    cart2[cart2.length] = item;

    let sum = this.state.cartSum;
    sum = sum + 33;

    this.setState({
      showCart: true,
      cartSum: sum,
      cart: cart2
    })

    event.preventDefault();
  };

  onDismiss(id2) {

    const { cart } = this.state;
    const isNotId = item => item.id2 !== id2;
    const updatedHits = cart.filter(isNotId);

    let show = true;
    if(updatedHits.length == 0){
      show = false;
    }

    let sum = this.state.cartSum;
    sum = sum - 33;

    this.setState({
      showCart: show,
      cart: updatedHits,
      cartSum: sum
    })
  }

  render() {

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
      cart = <Cart cart={this.state.cart} sum={this.state.cartSum} onDismiss={this.onDismiss}/>;
    } else {
      cart = <div></div>;
    }

    return (
      <div>

        <div className="row">
          <div className="col-xs-12 col-sm-12 col-md-12">
            <h2 className="d-block p-2 bg-dark text-white">Hàng Việt Nam Shop</h2>
          </div>
        </div>

        <div className="row">
          <div className="col-xs-12 col-sm-12 col-md-8">
            <SearchBar filterText={this.state.filterText} onChange={this.handleChange} onSubmit={this.handleSubmit}/>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12 col-sm-12 col-md-4">
            {content}
          </div>
          <div className="col-xs-12 col-sm-12 col-md-4">
            {detail}
          </div>
          <div className="col-xs-12 col-sm-12 col-md-4">
            {cart}
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
}) => <form onSubmit={onSubmit} className="form-inline">
  <div className="form-group">
    <input
      type="text"
      value={filterText}
      onChange={onChange}
      className="form-control"
    />
  </div>
  <div className="form-group">
    <button type="submit" className="btn btn-primary"><b>Tìm</b></button>
  </div>
</form>

const TABLE = ({ data, handleDetail }) => <div>
<div className="d-block p-2 bg-secondary text-white"><h5>Mặt hàng</h5></div>
<div>
  <table id="tab" className="table table-borderless table-sm">
  <tbody>{ data.map((item, i) => <ROW key = {i} current={i} post = {item} handleDetail = {handleDetail}/>) }</tbody>
  </table>
</div>
</div>

const ROW = ({ current, post, handleDetail }) => <tr>
  <td><button id={post.id} onClick={() =>handleDetail(current)} type="button" className="btn btn-info"><b>{post.title}</b></button></td>
</tr>

const Detail = ({ Item, logo, handleAddToCart }) => <div>
  <div className="d-block p-2 bg-secondary text-white"><h5>Chi tiết</h5></div>
  <div><b>{Item.id} - </b><b>{Item.title}</b></div>
  <div><button onClick={handleAddToCart} type="button" className="btn btn-primary"><b>vào giỏ</b></button></div>
  <div><img src={logo} alt="Smiley face" className="rounded img-fluid"/></div>
  <br/>
</div>

const Cart = ({ cart, sum, onDismiss }) => <div>
<div className="d-block p-2 bg-secondary text-white"><h5>Giỏ hàng</h5></div>
<div>
  <table id="tab2" className="table table-sm">
  <thead>
    <tr><th scope="col">Mã số</th><th scope="col">Mặt hàng</th></tr>
  </thead>
  <tbody>
    { cart.map((item, i) => <tr key = {i}><th scope="row">{item.id}</th><td>{item.title}</td><td><button onClick={() => onDismiss(item.id2)} type="button" className="btn btn-primary"><b>bỏ ra</b></button></td></tr>) }
    <tr><th scope="row">Sum</th><td><b>{sum}</b></td></tr>
  </tbody>
  </table>
</div>
</div>

export default Sapp;
