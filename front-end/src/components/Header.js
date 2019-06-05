import React from 'react'

export default function Header(props) {
    return (
        <header>
            {
                props.user &&
                <div>
                    <div>
                        <div className="logo"></div>
                        <span>ChefClients</span>
                    </div>
                    <small onClick={props.logout}>sair</small>
                </div>
            }
        </header> 
    )
}
