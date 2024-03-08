import {api,requestConfig} from '../utils/Config'


const getById = async(data) =>{

   
    const config = requestConfig('POST',data);

    try {

        const res = await fetch(api + 'form/getById' , config)
        .then((res) => res.json())
        .catch((err) => err);
        
        return res;
        
    } catch (error) {
        console.log(error);
    }

}
const update = async(data) =>{

    const config = requestConfig('POST',data)

    try {

        const res = await fetch(api + 'form/update', config)
        .then((res) => res.json())
        .catch((err) => err);
        
        return res;
        
    } catch (error) {
        console.log(error);
    }

}
const formService = {
    getById,
    update
}

export default formService;