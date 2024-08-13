import React from 'react';

const Notification = ({ message, type, onClose }) => {
    return (
        <div className={`alert alert-success notification ${type}`}>

            <div className='row'>
                <div className='col-md-12'>
                    <button className='btn btn-default' onClick={onClose}>X</button> <strong>{type == 'success' ? 'Alterado com sucess' : 'Ocorreu um erro'}</strong>  <span>{message}</span> 
                </div>
           </div>
        </div>
    );
};

export default Notification;