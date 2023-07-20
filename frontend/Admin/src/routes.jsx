import React from 'react';
import App from './view/app';
import {
  BrowserRouter,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import Login from './auth/login';


export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/" component={App} />
        <Redirect to={'/login'} /> <Login />
      </Switch>
    </BrowserRouter>
  );
}
