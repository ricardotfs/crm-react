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
            <h1 class="page-header text-overflow mt-5">{data.Token}</h1>
            <div className='row'>
                <div class="col-md-4">
                    <table class="pull-right invoice-details">
                        <tbody>
                            <tr>
                                <td class="text-left text-bold">Data de criacao:</td>
                                <td class="text-left text-primary text-bold">{convertDateFormat(data.DataCriacao)}</td>
                            </tr>
                            <tr>
                                <td class="text-left text-bold">Usuario de criação:</td>
                                <td class="text-left text-bold text-main">{data.UsuarioCriacao || ''}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="col-md-4">
                    <table class="pull-right invoice-details">
                        <tbody>
                            <tr>
                                <td class="text-left text-bold">Data de alteração:</td>
                                <td class="text-left text-primary text-bold">{convertDateFormat(data.DataAlteracao)}</td>
                            </tr>
                            <tr>
                                <td class="text-left text-bold">Usuario de alteração:</td>
                                <td class="text-left text-bold text-main">{data.UsuarioAlteracao || ''}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="col-md-4">
                    <table class="pull-right invoice-details">
                        <tbody>
                            <tr>
                                <td class="text-main text-bold">Proprietário:</td>
                                <td class="text-right text-primary text-bold">{data.Proprietario || ''}</td>
                            </tr>
                            <tr>
                                <td class="text-main text-bold">Status:</td>
                                <td class="text-right"><span class="badge badge-success">Complete</span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default HeaderActivity;