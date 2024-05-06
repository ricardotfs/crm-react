import React  from "react";

const HeaderActivity = ({tipo,data}) => { 

    const convertDateFormat = (inputDate)  => {

        if(inputDate === undefined || inputDate === null)
            return '';

        // Parse the input date string
        const date = new Date(inputDate);
      
        // Extract date and time components
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
      
        // Format the date and time
        const formattedDate = `${day}/${month}/${year}`;
        const formattedTime = `${hours}:${minutes}`;
      
        // Return the formatted date and time
        return `${formattedDate} ${formattedTime}`;
      }
    

    return (
        <div id="page-title">
            <h1 class="page-header text-overflow">{data.Token}</h1>
            <div className='row'>
                <div class="col-md-4">
                    <table class="pull-right invoice-details">
                        <tbody>
                            <tr>
                                <td class="text-left text-bold">Data de criacao:</td>
                                <td class="text-left text-bold"><small>{convertDateFormat(data.DataCriacao)}</small></td>
                            </tr>
                            <tr>
                                <td class="text-left text-bold">Usuario de criação:</td>
                                <td class="text-left text-bold text-main"><small>{data.UsuarioCriacao || ''}</small></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="col-md-4">
                    <table class="pull-right invoice-details">
                        <tbody>
                            <tr>
                                <td class="text-left text-bold">Data de alteração:</td>
                                <td class="text-left text-bold"><small>{convertDateFormat(data.DataAlteracao)}</small></td>
                            </tr>
                            <tr>
                                <td class="text-left text-bold">Usuario de alteração:</td>
                                <td class="text-left text-bold text-main"><small>{data.UsuarioAlteracao || ''}</small></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="col-md-4">
                    <table class="pull-right invoice-details">
                        <tbody>
                            <tr>
                                <td class="text-main text-bold">Proprietário:</td>
                                <td class="text-right text-bold"><small>{data.Proprietario || ''}</small></td>
                            </tr>
                            <tr>
                                <td class="text-main text-bold">Status:</td>
                                <td class="text-right"><span class="badge badge-success">{data.Status || ''}</span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default HeaderActivity;