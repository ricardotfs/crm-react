import './Form.css'
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { getById, update } from '../../slice/formSlice';
import { useParams } from 'react-router-dom';
import Loding from '../loding/Loding'
import Field from '../field/Field';

const Form = () => {
    const TICKET = 'ticket';

    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const { dataForm, data, loading, message } = useSelector((state) => state.form);
    const [token, setToken] = useState('');
    const [idAtiv, setIdAtiv] = useState(id);
    const [formField, setFormFields] = useState([]);
    const array = [];

    useEffect(() => {
        if (dataForm !== undefined) {
            setTimeout(() => {
                setFormFields(dataForm.data);
            }, 300)

        }


    }, [dataForm])

    useEffect(() => {
        console.log(data);
        if (data.groups != undefined) {

            data.groups.forEach(el => {
                el = { ...el, isClicked: false };
                el.properties.forEach(p => {
                    array.push(p)
                })
            });
        }

        setFormFields(array);

    }, [loading]);

    useEffect(() => {

        let tipo = '';

        if (location.pathname.includes('ticket')) {
            tipo = TICKET;
        }


        const search = { id: id, tipo: tipo };
        dispatch(getById(search));

    }, [dispatch]);

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
            id: idAtiv,
            idConta: 1,
            properties: formField,
        }

        dispatch(update(form));
    };
    const handleNew = () => {
        const array = [];
        formField.forEach((el) => {
            array.push({ ...el, Resposta: '' });
        })

        setFormFields(array);
        setIdAtiv(0);
    }

    const handleClickFormActive = (data, id) => {

        data.groups.forEach(group => {
            let div = document.getElementById(`form_${group.Id}`);
            if (div === null)
                return;

            if (group.Id === id) {
                div.classList.add('active');
            }
            else {
                div.classList.remove('active');
            }
        });
    };

    return (
        <div className='mt-2 row'>
            <div  className='mt-5 row'>
                <div className='col-md-2'></div>
                <div className='col-md-10'>
                    <h3>TKT000{id}</h3>
                </div>
                
            </div>
            <div className='mt-1 row' style={{ 'background-color': '#ecf0f5', 'padding': '1px;' }}>
                <div className="tab-base tab-stacked-left col-md-2">
                    <ul className="nav nav-tabs">
                        {data && data.groups && data.groups.length > 0 && data.groups.map((group, indexGrup) => (
                            <li key={indexGrup}  >
                                <a onClick={() => handleClickFormActive(data, group.Id)} key={indexGrup} className={`nav-link ${(indexGrup === 0 ? "active" : group.isSelected ? "active" : "")}`} id="v-pills-home-tab" data-toggle="pill" href={`#`} role="tab" aria-controls="v-pills-home" aria-selected="true">{group.Nome}</a>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="tab-content col-md-10">
                    {data && data.groups && data.groups.length > 0 && data.groups.map((group, indexName) => (
                        <div key={indexName} className={`tab-pane in ${(indexName === 0 ? "active" : group.isSelected ? "active" : "")}`} id={`form_${group.Id}`} role="tabpanel" aria-labelledby="v-pills-home-tab">
                            <legend style={{ 'color': '#4d627b', 'text-align': 'left' }}>{group.Nome}</legend>
                            <div className='row'>
                                {formField.filter((p) => {
                                    if (p.IdPropriedadeGrupo === group.Id)
                                        return p;
                                }).map((field) => (
                                    <Field field={field} handleChange={handleChange} />
                                ))}
                            </div>
                        </div>
                    ))}

                </div>
            </div>
            <div className='row mt-4' >
                <div className="col-md-6">

                </div>
                <div className="col-md-6">
                    <button type="submit" onClick={handleNew} className="btn btn-primary mr-1">Novo</button>
                    <button type="submit" onClick={hanbleUpdate} className="btn btn-primary mr-1">Salvar</button>
                    <a type="submit" className="btn btn-secondary mr-1" href='/'>Fechar</a>
                </div>
            </div>
        </div>
    );
};

export default Form;
