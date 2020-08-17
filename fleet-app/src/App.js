import React from 'react';
import logo from './logo.svg';
import './App.css';
//import ApolloClient from 'apollo-boost';
//import {ApolloProvider } from 'react-apollo';
//import User from './User';
/*const client = new ApolloClient({
  uri: 'http://localhost:3000/graphql'
})*/
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Navigation from './Navigation';
import LoginPage from './Login';
import RegisterPage from './Register';
import ProfilePage from './Profile';
function App() {
  return (
   <Router>
     <React.Fragment>
       <Navigation />
       <hr/>
       <Route path="/login" component={LoginPage}></Route>
       <Route path="/register" component={RegisterPage}></Route>
       <Route path="/profile" component={ProfilePage}></Route>
     </React.Fragment>
   </Router>
  );
}

export default App;
