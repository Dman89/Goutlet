import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Route, BrowserRouter as Router } from 'react-router-dom'
//import * as serviceWorker from './serviceWorker';

const routing = (
    <Router>
        <Route exact path="/" component={App} />
        <Route path="/pantry" component={App} />
        <Route path="/cookbook" component={App} />
        <Route exact path="/explore" component={App} />
        <Route exact path="/explore/receipe/:id" component={App} />
        <Route exact path="/explore/author/:id" component={App} />
        <Route exact path="/explore/ingredient/:id" component={App} />
        <Route path="/planner" component={App} />
    </Router>
)

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();
