import axios from 'axios'
import config from './config'

class APIService {

    constructor() {
        let acessToken = JSON.parse(localStorage.getItem("authTokens")).access
        this.headers = {
            "Accept":"application/json",
            "Content-type":"application/json",
            "Authorization":"Bearer " + String(acessToken)
        }
        this.api = axios.create({baseURL: config.API_URL})  
    }
    
    post(url, data, params=null){
        return this.api.post(
            url, 
            data,
            {
                params: params,
                headers :this.headers
            }
        )
    } 
        
    put(url, data, params=null){
        return this.api.put(
            url,
            data, 
            { 
                params: params,
                headers :this.headers 
            }
        )
     }
            
    get(url, params=null){
        return this.api.get(
            url, 
            { 
                params: params, 
                headers :this.headers 
            }   
        )
    }
        
    delete(url, params=null){
        return this.api.delete(
            url, 
            { 
                params: params, 
                headers :this.headers 
            }
            )
        }
    }
        
    export default APIService;