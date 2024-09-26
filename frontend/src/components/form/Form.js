import './Form.css'
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { getById, update } from '../../slice/formSlice';
import { useParams, Link } from 'react-router-dom';
import Loding from '../loding/Loding'
import Field from '../field/Field';
import HeaderActivity from '../header/HeaderActivity'
import Loading from '../loding/Loding';
import Notification from '../notification/Notification';

const Form = ({ type, typeName }) => {


    const [notifications, setNotifications] = useState([]);

    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const { dataForm, data, loading, successUpdate } = useSelector((state) => state.form);
    const [token, setToken] = useState('');
    const [idAtiv, setIdAtiv] = useState(id);
    const [formField, setFormFields] = useState([]);
    const [msg,setMsg]= useState(false);
    const array = [];

    const addNotification = (message, type) => {
        const id = new Date().getTime();
        setNotifications([...notifications, { id, message, type }]);
        
        setTimeout(() => {
            setNotifications(notifications.filter(notification => notification.id !== id));
        }, 5000); // Auto remove after 5 seconds
    };
    const removeNotification = (id) => {
        setNotifications(notifications.filter(notification => notification.id !== id));
    };

    useEffect(() => {
        if (dataForm !== undefined) {
            setTimeout(() => {
                setFormFields(dataForm.data);
            }, 300)

        }


    }, [dataForm])

    useEffect(() => {
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

        if (location.pathname.includes(typeName)) {
            tipo = typeName;
        }


        const search = { id: id, tipo: type };
        dispatch(getById(search));

    }, [dispatch]);


    useEffect(()=> { 

        if(!successUpdate){
            return;
        }
        
        setMsg(true);
        addNotification('','success');
        setTimeout(()=>{
            setMsg(false);
        },5000);

    },[successUpdate]);

    const handleCallGrid = () => {
        navigate('/');
    }


    const handleChange = (event, fieldId) => {
        const updatedFields = formField.map((field) => {
            if (field.Id === fieldId) {
                return { ...field, Resposta: event.target.value, Valid: (field.IsRequired === 1 && field.Resposta === '' ? "IsRequired-crm" : "") };
            }
            return field;
        });

        setFormFields(updatedFields);
    };

    const hanbleUpdate = (e) => {
        e.preventDefault();
        let valid = true;

        formField.forEach(element => {
            if (element.IsRequired === 1 && element.Resposta === '') {
                valid = false;
            }
        });

        const form = {
            id: idAtiv,
            idConta: 1,
            tipo:type,
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
        <>
         <div className="notification-container">
            {notifications.map((notification) => (
                <Notification
                    key={notification.id}
                    message={notification.message}
                    type={notification.type}
                    activity={type}
                    onClose={() => removeNotification(notification.id)}
                />
            ))}
            </div>
            
            {loading && <Loading />}
            {!loading && <div>
                {data && data.header && <HeaderActivity tipo={type} data={data.header} />}
                <div className='mt-2 row'>
                    <div className='mt-1 row' style={{ 'background-color': '#ecf0f5', 'padding': '1px;' }}>
                        <div className="tab-base tab-stacked-left col-md-2">
                            <ul className="pointer nav nav-tabs">
                                {data && data.groups && data.groups.length > 0 && data.groups.map((group, indexGrup) => (
                                    <li key={indexGrup}  >
                                        <a onClick={() => handleClickFormActive(data, group.Id,this)} key={indexGrup} className={`nav-link ${(indexGrup === 0 ? "active" : "")}`} id="v-pills-home-tab" data-toggle="pill" href={`#`} role="tab" aria-controls="v-pills-home" aria-selected="true">{group.Nome}</a>
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
                    <div class="row">
                        <div class="col-sm-6">
                        </div>
                        <div class="col-sm-6">
                            <div class="pad-ver mt-5">

                                <button onClick={handleNew} class="btn btn-primary margin-form" type="submit">Novo</button>

                                <button onClick={hanbleUpdate} class="btn btn-primary margin-form " type="reset">Salvar</button>


                                <Link to={`/${typeName}`}>
                                    <button class="btn btn-primary margin-form " type="reset">Fechar</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            }
        </>

    );
};

export default Form;
