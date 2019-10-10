import React from 'react';
import './App.css';
import Welcome from './components/welcome';
import {View} from './components/view';
import {Edit} from './components/edit';
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";

export default function App() {
  return (
    <BrowserRouter>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/view">View</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
      	    <Route exact path="/" component={Welcome}>
      	    </Route>
        	  <Route path="/view" component={View}>
    	      </Route>
            <Route path="/edit/:id" component={Edit}>
            </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

