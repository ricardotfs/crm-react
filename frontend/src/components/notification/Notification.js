import React from 'react';

const Notification = ({ message, type, onClose }) => {
    return (
        <div className={`alert alert-success notification ${type}`}>
           
            <strong>Well done!</strong>  <span>{message}</span>
            <button onClick={onClose}>X</button>
        </div>
    );
};

export default Notification;