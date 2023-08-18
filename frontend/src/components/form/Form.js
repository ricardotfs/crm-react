import './Form.css'
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {useSelector,useDispatch} from 'react-redux'
import { getById } from '../../slice/formSlice';
import { useParams } from 'react-router-dom';


const Formulario = ()  =>{
    const {id} = useParams();
    const dispatch = useDispatch();
    const navigete = useNavigate();
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

    return (
        <div>
            <div>
                {data.groups && data.groups.length > 0 && data.groups.map((group) => (
                    <>
                        <h1>{group.Nome}</h1>   
                        <div>
                            { group.properties && group.properties.length > 0 && group.properties.map((prop) => ( 
                                <>
                                    <label>{prop.Nome}</label>   
                                    {prop.IdTipoPropriedade === 1 && (<input type="text" />)} 
                                    <br />
                                </>
                            
                        )) }
                        </div>
                        
                    </>
                   
                )) }


            </div>
            <h1>
                {token}
            </h1>
        </div>
    );
};

export default Formulario
