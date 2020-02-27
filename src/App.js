import React from 'react';
import './bootstrap.min.css';
import './App.css'
import { Switch, Route, Router } from 'react-router-dom'

import Register from './components/Register'
import Login from './components/Login'
import ReactFeed from './components/Feed/ReactFeed'
import SplashScreen from './components/splash-screen/splash'

function App() {
  return (
    <Switch>
      <Route path="/register" exact component={Register} />
      <Route path="/login" exact component={Login} />
      <Route path="/">
        <SplashScreen>
          <Route path="/" exact component={ReactFeed} />
        </SplashScreen>
      </Route>
    </Switch>
  );
}

export default App;
