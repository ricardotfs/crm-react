import React from 'react'
import './Ticket.css'
//Components
import Form from '../../components/form/Form'

const Ticket = () => {
    const TICKET = 6;
    return (
        <>
            <Form tipo={TICKET}/>
        </>
    );
};

export default Ticket;