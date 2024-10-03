import {api,requestConfig} from '../utils/Config'

const getData = async(data,token) =>{

    const config = requestConfig('POST',data,token)

    try {

        const res = await fetch(api + 'grid', config)
        .then((res) => res.json())
        .catch((err) => err);

   
        return res;
        
    } catch (error) {
        console.log(error);
    }

}

const gridService = {
    getData
}

export default gridService;