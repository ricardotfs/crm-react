import {api,requestConfig} from '../utils/Config'


const getById = async(id) =>{

    const config = requestConfig('GET')

    try {

        const res = await fetch(api + 'formulario/getById' + id , config)
        .then((res) => res.json())
        .catch((err) => err);
        
        return res;
        
    } catch (error) {
        console.log(error);
    }

}
const formService = {
    getById
}

export default formService;