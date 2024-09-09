import React from "react";
import './Phone.css'
//Components
import Form from '../../components/form/Form'

const Phone = () =>{
    const type = 4;
    const typeName = 'phone';

    return (
        <>
            <Form type={type} typeName={typeName}/> 
        </>
    )
}

export default Phone;
