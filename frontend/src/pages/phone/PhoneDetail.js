import React from "react";
import './Phone.css'
//Components
import Form from '../../components/form/Form'

const PhoneDetail = () =>{
    const type = 4;
    const typeName = 'phone';

    return (
        <>
            <Form type={type} typeName={typeName}/> 
        </>
    )
}

export default PhoneDetail;
