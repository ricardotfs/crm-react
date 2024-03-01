import './Form.css'
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { getById,update } from '../../slice/formSlice';
import { useParams } from 'react-router-dom';
import Loding  from '../loding/Loding' 
import Field from '../field/Field';

const Form = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { dataForm,data, loading, message } = useSelector((state) => state.form);
    const [token, setToken] = useState('');
    const [idAtiv, setIdAtiv] = useState(id);
    const [formField, setFormFields] = useState([]);
    const array = [];

    useEffect(()=>{
        if(dataForm !== undefined){
            setTimeout(()=>{
                setFormFields(dataForm.data);
            },300)  
            
        }
        
        
    },[dataForm])   

    useEffect(() => {
        console.log(data);
        if (data.groups != undefined) {

            data.groups.forEach(el => {
                el.properties.forEach(p => {
                    array.push(p)
                })
            });
        }

        setFormFields(array);

    }, [loading]);

    useEffect(() => {

        dispatch(getById(id));

    }, [id]);

    const handleCallGrid = () => {
        navigate('/');
    }


    const handleChange = (event, fieldId) => {
        const updatedFields = formField.map((field) => {
            if (field.Id === fieldId) {
                return { ...field, Resposta: event.target.value };
            }
            return field;
        });

        setFormFields(updatedFields);
    };

    const hanbleUpdate = (e) => {
        e.preventDefault();
        
        const form = {
            id:idAtiv,
            idConta:1,
            properties: formField,
        }
        
        dispatch(update(form));
    };
    const handleNew = () =>{
        const array = [];
        formField.forEach((el)=>{
            array.push({...el,Resposta:''});
        })

        setFormFields(array);
        setIdAtiv(0);
    }


    return (
        <div>
            <h1>
                {token}
        </h1>
            {loading && <Loding/>}
            {!loading && 
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-3">
                        <div className="nav nav-tabs flex-column nav-pills tabs-container" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                            {data && data.groups && data.groups.length > 0 && data.groups.map((group, indexGrup) => (
                                <a key={indexGrup} className={`nav-link ${(indexGrup === 0 ? "active":"" )}`} id="v-pills-home-tab" data-toggle="pill" href={`#form_${group.Id}`} role="tab" aria-controls="v-pills-home" aria-selected="true">{group.Nome}</a>
                            ))}
                        </div>
                    </div>
                    <div className="col-md-9">
                        <div className="tab-content">
                            {data && data.groups && data.groups.length > 0 && data.groups.map((group, indexName) => (
                                    <div key={indexName} className={`tab-pane in ${(indexName === 0 ? "active":"" )}`}  id={`form_${group.Id}`} role="tabpanel" aria-labelledby="v-pills-home-tab">
                                        <>
                                        <legend  key={indexName}  className="titulo-grupo">{group.Nome}</legend>
                                        <div className='row'>
                                            {formField.filter((p) => {
                                                if (p.IdPropriedadeGrupo === group.Id)
                                                    return p;
                                            }).map((field) => (
                                                <Field field={field} handleChange ={handleChange} />
                                            ))}
                                        </div>
                                        </>
                                        
                                    </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>}         
            <div className='row mt-4' >
                <div className="col-md-6">

                </div>
                <div className="col-md-6">
                <button type="submit" onClick={handleNew} className="btn btn-primary mr-1">Novo</button>
                    <button type="submit" onClick={hanbleUpdate} className="btn btn-primary mr-1">Salvar</button>
                    <button type="submit" className="btn btn-secondary mr-1" >Fechar</button>
                </div>
            </div>

        </div>
    );
};

export default Form;
