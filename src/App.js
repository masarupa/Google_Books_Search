import React, {Component} from 'react';
import './App.css';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Search from "./Components/Search";
import Saved from "./Components/Saved";

export default class App extends Component {
  render(){
return(
  <BrowserRouter>
  <Switch>
  <Route exact path ="/saved" component={Saved}></Route>
  <Route exact path ="/" component={Search}></Route>

  </Switch>
  </BrowserRouter>
)
  }
}


