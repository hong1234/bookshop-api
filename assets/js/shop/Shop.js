import React from 'react';
import axios from 'axios';
import { v4 } from 'uuid';

import 'bootstrap/dist/css/bootstrap.min.css';

const apiUrl = 'http://localhost/api/posts?searchkeys=';


class Shop extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      filterText: 'fisch',
      isSubmited: false,
      data: [],
      showDetail: false,
      itemData: {},
      showCart: false,
      cart: [],
      cartSum: 0.00
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

    let sum = this.state.cartSum;
    sum = (sum*100 + item.price*100)/100;
    sum = Number.parseFloat(sum).toFixed(2);

    //cart2.push(item);
    cart2[cart2.length] = item;

    this.setState({
      showCart: true,
      cartSum: sum,
      cart: cart2
    })

    event.preventDefault();
  };

  onDismiss(it) {

    const { cart } = this.state;
    const isNotId = item => item.id2 !== it.id2;
    const updatedHits = cart.filter(isNotId);

    let show = true;
    if(updatedHits.length == 0){
      show = false;
    }

    let sum = this.state.cartSum;
    sum = (sum*100 - it.price*100)/100;
    sum = Number.parseFloat(sum).toFixed(2);

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
    let content;

    if (isSubmited) {
      content = <List {...this.state} handleDetail={this.handleDetail}/>;
    } else {
      content = <div></div>;
    }

    if (showDetail) {
      const Item = this.state.itemData;
      const logo = `/image/${Item.image}`;
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
            <br/>
            <h2 className="d-block p-3 bg-secondary text-white">Asia Laden</h2>
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
            <br/>
          </div>
          <div className="col-xs-12 col-sm-12 col-md-4">
             {detail}
          </div>
          <div className="col-xs-12 col-sm-12 col-md-4">
             {cart}
             <br/>
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
    <button type="submit" className="btn btn-info"><b>Suchen</b></button>
  </div>
</form>

const List = ({data, handleDetail}) => <div>
<div className="d-block p-2 bg-secondary text-white"><h5>Produkt</h5></div>
<div>
  <ul className="list-group">
    { data.map((item, i) => <button key = {i} id={item.id} type="button" onClick={() => handleDetail(i)} className="list-group-item list-group-item-action">{item.title}</button>) }
  </ul>
</div>
</div>

const addLineBreaks = string =>
  string.split('\n').map((text, index) => (
    <React.Fragment key={`${text}-${index}`}>
      {text}
      <br />
    </React.Fragment>
  ));

const Detail = ({ Item, logo, handleAddToCart }) => <div>
  <div className="d-block p-2 bg-secondary text-white"><h5>Beschreibung</h5></div>
  <div className="card">
     <img src={logo} alt="Smiley face" className="rounded img-fluid"/>
     <div className="card-body">
       <h5 className="card-title">{Item.id}- {Item.title}</h5>
       <p className="card-text">Preis : {Item.price} €</p>
       <p className="card-text">{addLineBreaks(Item.body)}</p>
       <button onClick={handleAddToCart} type="button" className="btn btn-info"><b>nehmen</b></button>
     </div>
  </div>
  <br/>
</div>

const Cart = ({ cart, sum, onDismiss }) => <div>
<div className="d-block p-2 bg-secondary text-white"><h5>Warenkorb</h5></div>
<div>
  <ul className="list-group">
    {cart.map((item, i) => <li key = {i} className="list-group-item d-flex justify-content-between align-items-center">
      {item.id}- {item.title}  +{item.price} €
      <button onClick={() => onDismiss(item)} type="button" className="close" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
      </li>
    )}
    <li className="list-group-item d-flex justify-content-between align-items-center">
    Summe
    <span>{sum} €</span>
    </li>
  </ul>
</div>
</div>

export default Shop;
