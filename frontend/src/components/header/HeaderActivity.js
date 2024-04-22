import React from "react";
import { useParams } from 'react-router-dom';

const HeaderActivity = () => {

    const { id } = useParams();
    return (
        <div id="page-title">
            <h1 class="page-header text-overflow mt-5">TKT0001</h1>
            <div className='row'>
                <div class="col-md-4">
                    <table class="pull-right invoice-details">
                        <tbody>
                            <tr>
                                <td class="text-main text-bold">Data de criacao:</td>
                                <td class="text-right text-primary text-bold">10/10/2024</td>
                            </tr>
                            <tr>
                                <td class="text-main text-bold">Usuario de criação:</td>
                                <td class="text-right text-bold text-main">$ 612.04</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="col-md-4">
                    <table class="pull-right invoice-details">
                        <tbody>
                            <tr>
                                <td class="text-main text-bold">Data de alteração:</td>
                                <td class="text-right text-primary text-bold">10/10/2024</td>
                            </tr>
                            <tr>
                                <td class="text-main text-bold">Usuario de alteração:</td>
                                <td class="text-right text-bold text-main">$ 612.04</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="col-md-4">
                    <table class="pull-right invoice-details">
                        <tbody>
                            <tr>
                                <td class="text-main text-bold">Proprietário:</td>
                                <td class="text-right text-primary text-bold">10/10/2024</td>
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