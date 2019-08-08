
import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Alert, Input } from 'reactstrap';
import { APP } from "./util";
import axios from 'axios';
import { v4 } from 'uuid';

//import 'bootstrap/dist/css/bootstrap.min.css';

class ProductForm extends Component {
    constructor (props) {
        super(props);
        this.state = {
            title: '',
            searchkeys: '',
            body: '',
            price: '',
            image: null,
            imageKey: v4(),
            errorMessage:null,
            error: false,
            isLoading: false
        };
        this.fileChangeHandler = this.fileChangeHandler.bind(this);
        this.submitForm = this.submitForm.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    fileChangeHandler(e) {
        this.setState({
            image: e.target.files[0]
        });
    };

    submitForm(e) {
        e.preventDefault();

        if (this.state.title.trim() && this.state.searchkeys.trim() && this.state.body.trim() && this.state.price.trim() && this.state.image !== null ) {
          this.setState({
              isLoading: true,
              error: false,
              errorMessage: ''
          });
          //const body = new FormData(Form);
          const body = new FormData();
          body.append("title", e.target.title.value);
          body.append("searchkeys", e.target.searchkeys.value);
          body.append("body", e.target.body.value);
          body.append("price", e.target.price.value);
          //body.append("image", this.state.image);
          body.append("avatar", this.state.image);
          this._uploadToServer(body);

        } else {
          this.setState({
              isLoading: true,
              error: true,
              errorMessage: 'select a file please!'
          });
        }

    }

    _uploadToServer(body) {
        axios.post(`${APP.BASE_URL}/${APP.CREATE_PRODUCT_URL}`, body)
            .then(response => {
                this.setState({
                    title: '',
                    searchkeys: '',
                    body: '',
                    price: '',
                    image: null,
                    imageKey: v4(),
                    isLoading: false,
                    error: false,
                    errorMessage: ''
                });
                //this.props.addProduct(response.data)
                //document.getElementById('imageFile').value = null;
            }).catch(err => {
            this.setState({
                isLoading: false,
                error: true,
                errorMessage: err.errors
            });
        });
    }

    render() {
        return (
          <div>
            <div className="text-md-center"><h4>ADD PRODUCT</h4></div>
            <div>
              <Form onSubmit={this.submitForm}>
                  <FormGroup>
                      <label>Product</label>
                      <Input type={'text'} name={'title'} value={ this.state.title } onChange={ this.handleInputChange } required placeholder='Enter the product name' className={'form-control'}/>
                  </FormGroup>

                  <FormGroup>
                      <label>Keys</label>
                      <Input type={'text'} name={'searchkeys'} value={ this.state.searchkeys } onChange={ this.handleInputChange } required placeholder='Enter the search keys' className={'form-control'}/>
                  </FormGroup>

                  <FormGroup>
                      <label>Description</label>
                      <Input type={'textarea'} name={'body'} value={ this.state.body } onChange={ this.handleInputChange } required placeholder='Enter product description' className={'form-control'} />
                  </FormGroup>

                  <FormGroup>
                      <label>Price</label>
                      <Input type={'text'} name={'price'} value={ this.state.price } onChange={ this.handleInputChange } required placeholder='Price' className={'form-control'}/>
                  </FormGroup>

                  <FormGroup>
                      <Label for="imageFile">Image</Label>
                      <Input type="file" name="image" id="imageFile" key={ this.state.imageKey } onChange={this.fileChangeHandler}/>
                  </FormGroup>

                  { this.state.error &&
                  <Alert color="danger">
                      {this.state.errorMessage}
                  </Alert>
                  }
                  <Button type='submit' outline color="success">Add Product</Button>
                  { this.state.isLoading && <Alert color="primary">
                      Loading ....
                  </Alert>}

              </Form>
            </div>
          </div>

        )
    }
}

export default ProductForm;
