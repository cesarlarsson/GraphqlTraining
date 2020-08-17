import React from 'react';
import logo from './logo.svg';
import './App.css';
//import ApolloClient from 'apollo-boost';
//import {ApolloProvider } from 'react-apollo';
//import User from './User';
/*const client = new ApolloClient({
  uri: 'http://localhost:3000/graphql'
})*/
import {BrowserRouter as Router, Route ,Redirect} from 'react-router-dom';
import Navigation from './Navigation';
import LoginPage from './Login';
import RegisterPage from './Register';
import ProfilePage from './Profile';
import activeSession from './ActiveSession';
import LogoutPage from './Logout';
function App({session,refetch}) {
  return (
   <Router>
     <React.Fragment>
       <Navigation session={session} />
       <hr/>
       <Route path="/login" 
       component={ ()=> (session && session.me )? <Redirect to="/profile" />:
       <LoginPage refetch={refetch}></LoginPage>}
       
       ></Route>
       <Route path="/register" component={RegisterPage}></Route>
       <Route path="/profile" component={()=>(session && session.me===null)?
       <Redirect to="/login" />:<ProfilePage></ProfilePage>}></Route>
       <Route path="/logout" component={()=>(session && session.me===null)?
       <Redirect to="/login" />:<LogoutPage></LogoutPage>}></Route>
     </React.Fragment>
   </Router>
  );
}

export default activeSession(App);
