import React from 'react'
const styles = {
    confirm:{
        backgroundColor:'#f44336'
    },
    default:{
        backgroundColor:'#4c4c4c'
    }
}
export default function ClientConfirm(props) {
    return (
        <div className="client-confirm">
            <div className="vertical-center">
                <b>Tem certeza?</b>
                <small>A ação não pode ser desfeita.</small>
                <div className="client-confirm-action">
                    <button onClick={ () => props.confirm(true) } style={styles.confirm}>Sim</button>
                    <button onClick={ () => props.confirm(false) } style={styles.default}>Não</button>
                </div>
           </div> 
        </div>
    )
}
