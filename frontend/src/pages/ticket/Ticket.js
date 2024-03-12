import React from 'react'
import './Ticket.css'
//Components
import Form from '../../components/form/Form'

const Ticket = () => {
    return (
        <div>
            <div id="content-container">
                <div id="page-content">
                    <div class='row'>
                        <div className='col-md-4'>
                            <div class='row'>
                                <div className='col-md-12'>
                                    <h3>Token:TKT0001</h3>
                                </div>
                                <div className='col-md-12'>
                                    <label ><i>*</i> Usuario de cadastro</label>
                                </div>
                                <div className='col-md-12 pr-2'>
                                    <label><i></i>.   . Ricardo Oliveira</label>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-8" id="divTicketDetails">
                            <div class="row" >
                                <div className='col-md-4'>
                                    <label for="campoContato" ><i>*</i> Proprietario</label>
                                    <select id="campoContato" class="form-control">
                                        <option value="0">Selecionar</option>
                                    </select>
                                </div>
                                <div className='col-md-4'>
                                    <label for="campoContato" ><i>*</i> Status</label>
                                    <select id="campoContato" class="form-control">
                                        <option value="0">Selecionar</option>
                                    </select>
                                </div>
                            </div>
                            <div class="row" >
                            <div className='col-md-12'>
                                    <label for="campoContato" ><i>*</i> Solicitante</label>
                                    <select id="campoContato" class="form-control">
                                        <option value="0">Selecionar</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Form />
                </div>
            </div>

        </div>
    );
};

export default Ticket;