import React from "react"
import Login from "./components/login/login"
import Signup from "./components/signup/signup"
import Home from "./components/home/home"
import Table from "./components/home/card/Table"
import { BrowserRouter as Router, Route} from "react-router-dom";
import { Provider } from 'react-redux';
import store from "./store.js"
import {loadUser} from "./actions/setUser"


function App() {
  store.dispatch(loadUser());
  return (
    <Router>
      <Route path="/signup" component={Signup} />
    
       <Provider store={store}> 
          <Route path="/home" component={Home} />
          <Route path="/" exact component={Login} />
          <Route path="/table" component={Table} />
       </Provider>
    </Router>
    
  );
}

export default App;
