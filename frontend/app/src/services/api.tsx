import axios from 'axios'
import API_URL from '../config'
import { getCookie } from 'cookies-next';
import { getAuthTokensFromRequest } from '../util/cookies';

export enum HttpStatus {
    OK = 200,
    CREATED = 201,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    METHOD_NOT_ALLOWED = 405,
    INTERNAL_SERVER_ERROR = 500,
    ERR_CONNECTION_REFUSED = 999
}

export enum ErrorMessage {
    OK = "OK",
    CREATED = "OK",
    BAD_REQUEST = "Erro ao fazer requisição para a API. Os dados não foram enviados da forma esperada.",
    UNAUTHORIZED = "Erro ao fazer requisição para a API. Usuário não autenticado.",
    FORBIDDEN = "Erro ao fazer requisição para a API. Usuário não tem permissão para realizar esta ação.",
    NOT_FOUND = "Erro ao fazer requisição para a API. O dado não foi encontrado ou foi removido.",
    METHOD_NOT_ALLOWED = "Erro ao fazer requisição para a API. Método não permitido.",
    INTERNAL_SERVER_ERROR = "Erro ao fazer requisição para a API. Erro interno.",
    ERR_CONNECTION_REFUSED = "Erro ao fazer requisição para a API. Não houve resposta do servidor.",
    GENERIC = "Erro ao fazer requisição para a API."
}


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
        ).catch((error:any) => {
            return this.handleError(error)
        })
    } 
        
    put(url:string, data:any, params=null){
        return this.http.put(
            url,
            data, 
            { 
                params: params,
                headers :this.headers 
            }
        ).catch((error:any) => {
            return this.handleError(error)
        })
     }
            
    get(url: string, params:any=null){
        return this.http.get(
            url, 
            { 
                params: params, 
                headers: this.headers 
            }   
        ).catch((error:any) => {
            return this.handleError(error)
        })
    }
        
    delete(url:string, params=null){
        return this.http.delete(
            url, 
            { 
                params: params, 
                headers :this.headers 
            }
        ).catch((error:any) => {
            return this.handleError(error)
        })
    }

    handleError(error:any){
        if (error.response) {
            const status = error.response.status
            const ret = {data:{}, message: ErrorMessage.GENERIC, detail:error.response.data?.detail, status:status}
            if (status === HttpStatus.UNAUTHORIZED)
                ret.message = ErrorMessage.UNAUTHORIZED
            if (status === HttpStatus.BAD_REQUEST)
                ret.message = ErrorMessage.BAD_REQUEST
            if (status === HttpStatus.FORBIDDEN)
                ret.message = ErrorMessage.FORBIDDEN
            if (status === HttpStatus.NOT_FOUND)
                ret.message = ErrorMessage.NOT_FOUND
            if (status === HttpStatus.METHOD_NOT_ALLOWED)
                ret.message = ErrorMessage.METHOD_NOT_ALLOWED
            if (status === HttpStatus.INTERNAL_SERVER_ERROR)
                ret.message = ErrorMessage.INTERNAL_SERVER_ERROR
            return ret 
        } else if (error.request){
            return {data:{}, message:ErrorMessage.ERR_CONNECTION_REFUSED, status:HttpStatus.ERR_CONNECTION_REFUSED}
        }
    }

}
        
export default APIService;
