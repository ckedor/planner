import cookie from "cookie";
import { setCookie as setCookieNext } from 'cookies-next';

export function setCookie(
    key: string, 
    value: string | object,
    options?: any,
    ){
    // Apenas para client side 
    setCookieNext(key, JSON.stringify(value), {
        ...options,
        secure: process.env.NODE_ENV === 'production' ? true : false
    });
}

export function parseCookies(req?: any){
    if(!req || !req.headers){
        return {}
    }

    return cookie.parse(req.headers.cookie || "");
}

export function getAuthTokensFromRequest(req?:any){
    let cookies = parseCookies(req)
    if (!cookies.authTokens){
        return null
    }
    return JSON.parse(cookies.authTokens)
}