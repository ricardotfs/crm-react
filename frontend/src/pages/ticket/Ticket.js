import React from 'react'
import './Ticket.css'
//Components
import Form from '../../components/form/Form'

const Ticket = () => {
    const type = 6;
    const typeName = 'ticket';
    return (
        <>
            <Form type={type} typeName={typeName}/>
        </>
    );
};

export default Ticket;