import React from 'react'
import './Phone.css'
//Components
import DynamicGrid from '../../components/grid/DynamicGrid';

const Phone = () => {
    const idTipoCadastro = 4;
    const type = 'phone';
    
    return (
        <div >
            <DynamicGrid idTipoCadastro={idTipoCadastro} type={type}/>
        </div>
      )
};

export default Phone;