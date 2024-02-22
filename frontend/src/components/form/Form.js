import './Form.css'
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { getById } from '../../slice/formSlice';
import { useParams } from 'react-router-dom';
import Field from '../field/Field';

const Form = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { data, loading } = useSelector((state) => state.form);
    const [token, setToken] = useState('');
    const [formField, setFormFields] = useState([]);
    const array = [];

    useEffect(() => {
        // if (data.activity != undefined) {
        //     setToken(data.activity.Token);
        // }

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
            id:id,
            properties: formField,
        }
        
    };

    return (
        <div>
            <h1>
                {token}
        </h1>

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
                                        <legend className="titulo-grupo">{group.Nome}</legend>
                                        <div className='row'>
                                            {formField.filter((p) => {
                                                if (p.IdPropriedadeGrupo === group.Id)
                                                    return p;
                                            }).map((field) => (
                                                <Field field={field} handleChange ={handleChange} />
                                            ))}
                                        </div>
                                    </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* <div className="container mt-5">
                <div className="row">
                    <div  className="col-md-3">
                        <div className="nav nav-tabs flex-column nav-pills tabs-container" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                            {data && data.groups && data.groups.length > 0 && data.groups.map((group, indexGrup) => 
                                <a key={indexGrup} className="nav-link active" id="v-pills-home-tab" data-toggle="pill" href={`#form_${group.Id}`} role="tab" aria-controls="v-pills-home" aria-selected="true">{group.Nome}</a>
                             ))} 
                        </div>
                    </div>
                    <div className="col-md-9">
                        <div className="tab-content">
                             {data && data.groups && data.groups.length > 0 && data.groups.map((group, indexG) => (
                                <>
                               { (indexG > 0)  && <div key={indexG} className="tab-pane fade" id={`form_${group.Id}`} role="tabpanel" aria-labelledby="v-pills-home-tab">
                                    <div className='row'>
                                         {group.properties && group.properties.length > 0 && group.properties.map((prop, index) => (
                                            <div className="col-md-12" >
                                                <h1 key={index} >Teste</h1>
                                                {/* <label className="form-label">{prop.Nome}</label>
                                                {prop.IdTipoPropriedade === 1 && (
                                                    <input key={prop.Id} id={`campo_${prop.Id}`} type="text" value={prop.Resposta || ''} className="form-control" />
                                                )} */}
            {/* </div>
                                        ))} 
                                    </div>
                                </div>} 
                                </>
                                ))} 
                                
                        </div>
                    </div>


                </div> 
            </div> 
            {/* <div>
                {data && data.groups && data.groups.length > 0 && data.groups.map((group, indexGrup) => (
                    <div className="col-md-12" key={indexGrup}>
                        <h1>{group.Nome}</h1>
                        <div className='row'>
                            {group.properties && group.properties.length > 0 && group.properties.map((prop, index) => (
                                <div className="col-md-12" key={index}>
                                    <label className="form-label">{prop.Nome}</label>
                                    {prop.IdTipoPropriedade === 1 && (
                                        <input id={`campo_${prop.Id}`} type="text" value={prop.Resposta} className="form-control" />
                                    )}
                                </div>
                            ))}
                        </div>

                    </div >

                ))}


            </div> */}
            <div className='row mt-4' >
                <div className="col-md-6">

                </div>
                <div className="col-md-6">
                    <button type="submit" onClick={hanbleUpdate} className="btn btn-primary mr-1">Salvar</button>
                    <button type="submit" className="btn btn-secondary mr-1" >Fechar</button>
                </div>
            </div>

        </div>
    );
};

export default Form;
