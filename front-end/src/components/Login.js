import React, { Component } from 'react';
import { connect } from 'react-redux';
import cookClose from '../assets/cook-close.svg';
import cookOpen from '../assets/cook-open.svg';
import CheckBox from './ui/CheckBox';
import Spin from './ui/Spin';
import * as ACTIONS from '../actions'
import { Redirect } from 'react-router-dom'
import * as HELPERS from '../helpers'

class Login extends Component {

    state = {
        username: '',
        password: '',
        show: false,
    }

    showPassword(){
        this.setState(
            {
                show: this.state.show ? false : true
            }
        )     
    }

    login(){

        const dispatch = this.props.dispatch;
        const {username,password} = this.state;
        
        if(!username || !password){
            dispatch(ACTIONS.failed('All fields are required.'))
            return;
        }

        dispatch(ACTIONS.login(
            username,
            password
        ))

    }
    
    render() {
        
        if(this.props.user.logged){
            return <Redirect to='/' />
        }
        
        return (
            <div>
                <form onSubmit={(e)=>{e.preventDefault()}}>
                    <div id="login-card" className="drop-shadow">
                        {/* <h2>Login</h2> */}
                        <div>
                            <div id="login-card-avatar"> 
                                <img src={ this.state.show ? cookOpen : cookClose } alt="Avatar" />                   
                            </div>
                        </div>
                        <div>
                            <label>Username</label>
                            <input onChange={(e)=>{HELPERS.setStateValues(e,this)}} name="username" type="text" value={this.state.username} />
                        </div>
                        <div>
                            <label>Password</label>
                            {
                                this.state.show ? 
                                    <input onChange={(e)=>{HELPERS.setStateValues(e,this)}} name="password" type="text" value={this.state.password} />
                                :
                                    <input onChange={(e)=>{HELPERS.setStateValues(e,this)}} name="password" type="password" value={this.state.password} />
                            }
                            
                        </div>
                        <div>
                            <label id="login-card-show" onClick={ () => { this.showPassword() } }>
                                <CheckBox checked={ this.state.show } />
                                <span>Show password.</span>
                            </label>
                        </div>
                        <div>
                            {
                                this.props.status.requested ? 
                                    <Spin />
                                :
                                    <button onClick={()=>{this.login()}}>Login</button>
                            }
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

function mapStateToProps(state){
    return state;
}

export default connect(mapStateToProps)(Login);

