import React, { Component } from 'react';
import * as ACTIONS from '../actions';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { CheckBox, Spin} from '.';
import * as HELPERS from '../helpers'
/* ICONS */
import closeIcon from '../assets/close.svg';

const client_default_state = {
    name:"",
    business: false,
    code:"",
    address:"",
    email:"",
    cel:"",
    tel:""        
}

class AddClient extends Component {

    state = this.props.update ? { ...client_default_state, ...this.props.update, ...this.props.update.contact } : client_default_state

    isBusiness(){
        this.setState(
            {
                business: this.state.business ? false : true
            }
        ) 
    }

    addClient(e){

        const client = {...this.state};
        const { dispatch, clients, update } = this.props; 

        if( !client.name || !client.code || !client.email){
            dispatch(ACTIONS.failed('Name, CNPJ/CPF and E-mail are required.'))
            return;
        }

        if(update){
            dispatch(ACTIONS.updateClient(clients, client, ()=>{
                this.clearState();
                this.props.close();
            }));
        } else {
            dispatch(ACTIONS.addClient(clients, client, () => this.clearState() ));
        }
        

    }

    clearState(){
        this.setState({
            ...client_default_state        
        }, ()=>{
            document.getElementById("first").focus();
        })
    }

    render() {
        
        if(!this.props.user.logged){
            return <Redirect to="/login" />
        }
        
        const {
            name,
            code,
            address,
            email,
            cel,
            tel
        } = this.state;

        return (
            <div id="add-card" >
                <form onSubmit={ (e)=>{e.preventDefault()} } className="drop-shadow">
                    <h4>{ this.props.update ? 'Update Entry' : 'Add Entry'} <img id="add-card-close" src={closeIcon} onClick={this.props.close} alt="fechar"/></h4>
                    <div>
                        <label>Name *</label>
                        <input onChange={(e)=>{HELPERS.setStateValues(e,this)}} name="name" id="first" value={name} type="text"/>
                    </div>
                    <div>
                        <label id="add-card-business" onClick={ () => { this.isBusiness() } } >
                            <div><CheckBox checked={ this.state.business } /></div>
                            <span>Is business?</span>
                        </label>                            
                    </div>
                    <div>
                        <label>{this.state.business ? 'CNPJ' : 'CPF'} *</label>
                        <input onChange={(e)=>{HELPERS.setStateValues(e,this)}} name="code" value={code} type="text"/>
                    </div>
                    <div>
                        <label>Address</label>
                        <input onChange={(e)=>{HELPERS.setStateValues(e,this)}} name="address" value={address} type="text"/>
                    </div>
                    <div>
                        <label>E-mail *</label>
                        <input onChange={(e)=>{HELPERS.setStateValues(e,this)}} name="email" value={email} type="text"/>
                    </div>
                    <div>
                        <label>Cellphone</label>
                        <input onChange={(e)=>{HELPERS.setStateValues(e,this)}} name="cel" value={cel} type="text"/>
                    </div>
                    <div>
                        <label>Telephone</label>
                        <input onChange={(e)=>{HELPERS.setStateValues(e,this)}} name="tel" value={tel} type="text"/>
                    </div>  
                    <div>
                            {
                                this.props.status.requested ? 
                                    <Spin />
                                :
                                    <button onClick={(e)=>{this.addClient(e)}}>Save</button>
                            }
                        </div>
                </form>
            </div>
        )
    }
}
function mapStateToProps(state){
    return state;
}

export default connect(mapStateToProps)(AddClient);
