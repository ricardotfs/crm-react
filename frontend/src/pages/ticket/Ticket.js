import React from 'react'
import './Ticket.css'
//Components
import DynamicGrid from '../../components/grid/DynamicGrid';

const Ticket = () => {
    const idTipoCadastro = 6;
    const type = 'ticket';
    
    return (
        <div >
            <DynamicGrid idTipoCadastro={idTipoCadastro} type={type}/>
        </div>
      )
};

export default Ticket;