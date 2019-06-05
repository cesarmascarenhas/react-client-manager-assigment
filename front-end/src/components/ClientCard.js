import React, { Component } from 'react';
import { connect } from 'react-redux';
import  { ClientCardMenu, ClientConfirm, Spin } from './'
/* ICONS */
import businessIcon from '../assets/business.svg';
import personIcon   from '../assets/person.svg';
import telIcon      from '../assets/tel.svg';
import celIcon      from '../assets/cel.svg';
import emailIcon    from '../assets/email.svg';

const styles = {
    container:{
        position:'absolute',
        width:'100%', 
        height:'100%',
        top:0,
        left:0,
        backgroundColor:'rgba(255,255,255,.75)'
    },
    spinner:{
        position:'absolute',
        top:'50%',
        left:'50%',
        transform:'translate(-50%,-50%)'
    },
    row:{
        width:'100%'
    }
}

function colorHash(letter){

    const color  = letter.charCodeAt(0) % 10;
    const colors = Array(10);

    colors[0] = "#317ffb";
    colors[1] = "#e91e63";
    colors[2] = "#8bc34a";
    colors[3] = "#ff9800";
    colors[4] = "#3f51b5";
    colors[5] = "#795548";
    colors[6] = "#673ab7";
    colors[7] = "#009688";
    colors[8] = "#00bcd4";
    colors[9] = "#f44336";

    return colors[color];
}

class Client extends Component {

    state = {
        update: false,
        confirm: false
    }

    isUpdating(){
        this.setState({
            update: this.state.update ? false : true
        }, () => this.props.remove(this.props._id) )
    }

    confirm(response){
        if(response){
            this.isUpdating()
            this.showConfirmAlert(false);
        } else {
            this.setState(
                {
                    confirm:false
                }
            )
        }
    }

    showConfirmAlert(response){
        this.setState({
            confirm: response
        })
    }

    render() {
        
        const {
            _id,
            name,
            code,
            business,
            contact
        } = this.props;

        const color = colorHash(name.substring(0,1).toLowerCase());
        const lastNameInitial = name.lastIndexOf(' ') + 1;

        return (
            <div className={`client-card  ${!this.props.grid ? 'row' : '' }`}>
                <div>
                    <div>
                        <div className="client-card-icon" style={{backgroundColor:color}}>
                            { `${name.substring(0,1).toUpperCase()} ${ name.substring(lastNameInitial,lastNameInitial+1).toUpperCase() }` }
                        </div>
                    </div>
                    <div className="client-card-name">
                        <b>{name}</b><br/>
                        <span className="client-card-code">
                            { code }
                            { business ? <img src={businessIcon} alt="" /> : <img src={personIcon} alt="" />}
                        </span>
                    </div>
                </div>
                <ul className="client-card-contacts">
                    {
                        contact.email && <li><img src={emailIcon} alt="" />{ contact.email }</li>
                    }
                    {
                        contact.cel && <li><img src={celIcon} alt="" />{ contact.cel }</li>
                    }
                    {
                        contact.tel && <li><img src={telIcon} alt="" />{ contact.tel }</li>
                    }
                </ul>
                {
                    this.props.user.role >= 5 && 
                    <ClientCardMenu 
                        remove={()=>this.showConfirmAlert(true)}
                        update={()=>this.props.update(_id) }
                        permission={this.props.user.role}
                    />
                }
                
                {
                    this.state.update && <div style={styles.container}><div style={styles.spinner}><Spin /></div></div>   
                }
                {
                    this.state.confirm && <ClientConfirm confirm={ (response) => { this.confirm(response) } } />
                }
                
            </div>
        )
    }

}

function mapStateToProps(state){
    return state;
}
export default connect(mapStateToProps)(Client);
