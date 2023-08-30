import './Form.css'
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {useSelector,useDispatch} from 'react-redux'
import { getById } from '../../slice/formSlice';
import { useParams } from 'react-router-dom';

const Form = ()  =>{
    const {id} = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {data,loading} = useSelector((state) => state.form);
    const [token,setToken] = useState('');

    useEffect(()=>{
        if(data.activity != undefined){
            setToken(data.activity.Token);
        }
            
    },[data]);

    useEffect(()=>{

        dispatch(getById(id));
        
      },[dispatch,id]);

    const handleCallGrid = ()=>{
        navigate('/'); 
    }
    return (
        <div>
            <h1>
                {token}
            </h1>
            <div>
                {data && data.groups && data.groups.length > 0 && data.groups.map((group,indexGrup) => (
                    <div className="col-md-12" key={indexGrup}>
                        <h1>{group.Nome}</h1>   
                        <div className='row'>
                            { group.properties && group.properties.length > 0 && group.properties.map((prop,index) => ( 
                                <div className="col-md-12" key={index}>
                                    <label className="form-label">{prop.Nome}</label>   
                                    {prop.IdTipoPropriedade === 1 && (
                                        <input id={`campo_${prop.Id}`} type="text" value={prop.Resposta} className="form-control"/>
                                    )} 
                                </div>
                        )) }
                        </div>
                        
                    </div >
                   
                )) }


            </div>
            <div className='row mt-4' >
                <div className="col-md-6">
                    
                </div>
                <div className="col-md-6">
                    <button type="submit" className="btn btn-primary mr-1">Salvar</button>
                    <button onClick={handleCallGrid} type="submit" className="btn btn-secondary mr-1" >Fechar</button>
                </div>
            </div>

        </div>
    );
};

export default Form;
