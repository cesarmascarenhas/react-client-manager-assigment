import React, { Component } from 'react';
import close from '../../assets/close.svg';
import * as ACTIONS from '../../actions';
import { connect } from 'react-redux';
import { sleep }  from '../../helpers'

const styles = {
    error:{
        backgroundColor:'#f44336'
    },
    default:{
        backgroundColor:'#222'
    }
}
class AlertBox extends Component {
    
    async systemAlert(msg = 'Error without message to display.', time = 2.5){
    
        const UI_SYSTEM_ALERT           = document.querySelector('#system-alert');
        const UI_SYSTEM_ALERT_MSG       = document.querySelector('#system-alert-msg');
        const UI_SYSTEM_ALERT_CLOSE     = document.querySelector('#system-alert-close');

        UI_SYSTEM_ALERT_MSG.innerHTML   = msg;
        
        await sleep(100);
        UI_SYSTEM_ALERT.style.transform = 'translateX(calc(0% - 1em))';
        
        let clear_timeout = setTimeout(() => {
            UI_SYSTEM_ALERT.style = '';
            clearStatus();
        }, time * 1000)

        UI_SYSTEM_ALERT_CLOSE.onclick = () => {
            clearTimeout(clear_timeout);
            UI_SYSTEM_ALERT.style = '';
            clearStatus();
        }

        let clearStatus = () => {
            let clearStatusInterval = setTimeout(()=>{
                this.props.dispatch(ACTIONS.clearStatus());
                clearInterval(clearStatusInterval);
            },350);            
        }

    }

    componentDidMount(){
        this.systemAlert(this.props.msg);
    }

    render() {
        return (
            <div id="system-alert" className="drop-shadow" style={ this.props.error ? styles.error : styles.default}>
                <div id="system-alert-msg"></div>
                <div id="system-alert-close"><img src={close} alt=""/></div>
            </div>
        )
    }
}

function mapStateToProps(state){
    return state;
}

export default connect(mapStateToProps)(AlertBox);