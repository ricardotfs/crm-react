import {api,requestConfig} from '../utils/Config'

const register = async(data) =>{

    const config = requestConfig('POST',data)

    try {

        const res = await fetch(api + 'users/register', config)
        .then((res) => res.json())
        .catch((err) => err);

        if(res){
            localStorage.setItem('user',JSON.stringify(res));
        }
        
        return res;
        
    } catch (error) {
        console.log(error);
    }

}

const login = async(data) =>{

    const config = requestConfig('POST',data)
    
    try {
        
        const res = await fetch(api + 'users/login',config)
                        .then((res) => res.json())
                        .catch((err) => err)

        if(res.id){
            localStorage.setItem('user',JSON.stringify(res))
        }                        

        return res;

    } catch (error) {
        console.log(error)
    }
}
const logOut = () =>{
    localStorage.removeItem('user')
}
const authService = {
    register,
    logOut,
    login
}

export default authService;