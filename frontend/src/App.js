import React from 'react';
import './App.css';
import { HashRouter, Route} from 'react-router-dom';
import Login from './Component/Login.js';
import Signup from './Component/Signup.js';
import Home from './Component/home.js';

function App() {
  return (
    <div className="App">
      <HashRouter basename='/'>
        <Route exact path="/" component={Login}></Route>
        <Route path="/login" component={Login}></Route>
        <Route path="/Signup" component={Signup}></Route>
        <Route path="/home" component={Home}></Route>
      </HashRouter>
    </div>
  );
}

export default App;
