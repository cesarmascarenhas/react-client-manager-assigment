import React , { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { Header, Footer, Login, Clients, AlertBox } from './components/'
import { logout }  from './actions'

class App extends Component {

  logout(){
      this.props.dispatch( logout(
        () => <Redirect to="/login"/>
      ) );
  }
  
  render() {

    return (
      <Router>              
        <div className="App">
          <Header user={this.props.user.logged} logout={()=>this.logout()}/>
          <Switch>
            <Route exact path="/login"  component={Login} />
            <Route exact path="/"       component={Clients} />
          </Switch>
          <Footer />
        </div>
        {
          ( this.props.status.failed || this.props.status.feedback ) ? 
            <AlertBox msg={this.props.status.msg} error={this.props.status.failed} />
          :
            ''
        }        
      </Router>
    );
  }
}

function mapStateToProps(state){
  return state;
}

export default connect(mapStateToProps)(App);
