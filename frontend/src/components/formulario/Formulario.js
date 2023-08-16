import './Formulario.css'
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {useSelector,useDispatch} from 'react-redux'
import { getById } from '../../slice/formSlice';


const Formulario = ()  =>{
    const dispatch = useDispatch();
    const navigete = useNavigate();
    const {data,loading} = useSelector((state) => state.form)
    const [token,setToken] = useState('');

    const loadData = () =>{
        
        dispatch(getById(1));
    }

    loadData();

    useEffect(()=>{

        setToken(data.activity.Token) 
    
      },[token]);

    return (
        <div>
            <h1>
                {token}
            </h1>
        </div>
    );
};

export default Formulario
