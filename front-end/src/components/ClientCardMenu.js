import React from 'react'
import menuIcon from '../assets/menu.svg';
import trashIcon from '../assets/trash.svg';
import editIcon from '../assets/edit.svg';

export default function ClientCardMenu(props) {
    return (
        <div className="client-card-menu">
            <img className="client-card-menu-icon" src={menuIcon} alt="menu"/>
            <div className="drop-shadow">
                <div className="arrow-up"></div>
                <ul>                            
                    {
                        props.permission >= 5 && <li onClick={props.update}><img src={editIcon} alt="editar"/> Editar</li>
                    }
                    {
                        props.permission >= 6 && <li onClick={props.remove}><img src={trashIcon} alt="deletar"/> Deletar</li>
                    }
                </ul>
            </div>                    
        </div> 
    )
}