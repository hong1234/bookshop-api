import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  Switch,
} from 'react-router-dom';

import PostList from './list/containers/PostList';
import AddForm from "./add/ProductForm.js";

const App = () => (

  <Router basename="/admin">

    <div className='container'>

      <div className="text-md-center">
      <h3 className='ui dividing header'>
        Admin Navigation
      </h3>

      <ul className="list-inline">
        <li className="list-inline-item">
          <Link to='/list'>
            <code>/list</code>
          </Link>
        </li>
        <li className="list-inline-item">
          <Link to='/add'>
            <code>/add</code>
          </Link>
        </li>
      </ul>
      </div>
      
      <hr />

      <Switch> 
        <Route path='/list' component={PostList} />
        <Route path='/add' component={AddForm} />
        <Route exact path='/' render={() => (
          
          <div className="text-md-center"><h4>Welcome! Select a action above.</h4></div>
        )} />
        <Route render={({ location }) => (
          <div className='ui inverted red segment'>
            <h3>Error! No matches for <code>{location.pathname}</code></h3>
          </div>
        )} />
      </Switch>

    </div>

  </Router>
);

export default App;
