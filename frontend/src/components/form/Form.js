import './Form.css'
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { getById } from '../../slice/formSlice';
import { useParams } from 'react-router-dom';

const Form = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { data, loading } = useSelector((state) => state.form);
    const [token, setToken] = useState('');
    const [formField, setFormFields] = useState([]);

    useEffect(() => {
        // if (data.activity != undefined) {
        //     setToken(data.activity.Token);
        // }
        
        console.log(data);
        if(data.groups != undefined)
            setFormFields(data.groups[0].properties);
        
    }, [loading]);

    useEffect(() => {

        dispatch(getById(id));

     
        
    }, [id]);

    const handleCallGrid = () => {
        navigate('/');
    }
  
      const handleInputChange = (id, value) => {
        // Update the state when the user enters data
        setFormFields((prevFields) =>
          prevFields.map((field) => (field.Id === id ? { ...field,Resposta:value } : field))
        );
      };
      const hanbleUpdate = (e)=>{
        e.preventDefault();

        let aa = formField;
      }
    return (
        <div>
            <h1>
                {token}
            </h1>   
            <form onSubmit={hanbleUpdate}>
                {formField.map((field) => (
                    <div key={field.Id}>
                    <label htmlFor={field.Nome}>{field.Nome}</label>
                    <input
                        type='text'
                        id={field.Nome}
                        value={field.Resposta}
                        onChange={(e) => handleInputChange(field.Id, e.target.value)}
                    />
                    </div>
                ))}
                <button type="submit"  >Submit</button>
                </form>
            {/* <div className="container mt-5">
                <div className="row">
                    <div  className="col-md-3">
                        <div className="nav nav-tabs flex-column nav-pills tabs-container" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                            {data && data.groups && data.groups.length > 0 && data.groups.map((group, indexGrup) => (
                             
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
                    <button type="submit" className="btn btn-primary mr-1">Salvar</button>
                    <button onClick={handleCallGrid} type="submit" className="btn btn-secondary mr-1" >Fechar</button>
                </div>
            </div>

        </div>
    );
};

export default Form;
