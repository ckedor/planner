import axios from 'axios'
import API_URL from '../config'
import { getCookie } from 'cookies-next';
import { getAuthTokensFromRequest } from '../util/cookies';

class APIService {

    headers: any;
    http: any;

    constructor(request?:any) {

        let authTokens = null
        let authorization = ""

        if (request){
            // server-side
            authTokens = getAuthTokensFromRequest(request)  
        } else {
            // client-side
            authTokens = getCookie("authTokens")
            if (authTokens){
                authTokens = JSON.parse(authTokens as string)
            }
        }

        if (authTokens){
            authorization = "Bearer " + authTokens.access
        }

        this.headers = {
            "Accept":"application/json",
            "Content-type":"application/json",
            "Authorization":authorization
        }

        this.http = axios.create({baseURL: API_URL}); 
    }
    
    post(url: string, data: any, params=null){
        return this.http.post(
            url, 
            data,
            {
                params: params,
                headers :this.headers
            }
        )
    } 
        
    put(url:string, data:any, params=null){
        return this.http.put(
            url,
            data, 
            { 
                params: params,
                headers :this.headers 
            }
        )
     }
            
    get(url: string, params:any=null){
        return this.http.get(
            url, 
            { 
                params: params, 
                headers: this.headers 
            }   
        ).catch(function (error:any) {
            if (error.response) {
                if (error.response.status === 401)
                    return {data:{}, message:"Erro ao buscar dados na API. Usuário não autenticado.", detail:error.response.data?.detail, status:401}
                return {data:{}, message:"Erro ao buscar dados na API.", status:error.response.status}
            } else if (error.request){
                return {data:{}, message:"Erro na requisição para a API."}
            }
        })
    }
        
    delete(url:string, params=null){
        return this.http.delete(
            url, 
            { 
                params: params, 
                headers :this.headers 
            }
        )
     }
}
        
export default APIService;