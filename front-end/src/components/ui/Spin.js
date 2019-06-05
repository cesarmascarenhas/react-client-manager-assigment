import React from 'react';
import spin from '../../assets/spin.svg';

export default function Spin() {
    return (
        <div className="spin">
            <img src={spin} alt="carregando..."/>
        </div>
    )
}
