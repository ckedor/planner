import { parseCookies } from "nookies";
import { getAuthTokensFromRequest } from "../util/cookies";


export function withAuth(func: any) {
    
    return async (ctx:any) =>{
        const { authTokens} = parseCookies(ctx)
        if (!authTokens){
            return {
                redirect: {
                    destination : '/login',
                    permanent: false,
                }
            }
        }
        
        return func(ctx)
    }
}

export function isTokenExpired(token: string){
    const payload = parseToken(token)

    const clockTimestamp = Math.floor(Date.now() / 1000);
    return clockTimestamp > payload.exp;
}

export function parseToken(token:string){
    return JSON.parse(Buffer
               .from(token.split('.')[1], "base64")
               .toString("utf8"));
}

export function getUsernameFromRequest(req:any){
    const authTokens = getAuthTokensFromRequest(req)
    if (!authTokens)
        return null
    return parseToken(authTokens.access).username
}

export function getUsernameFromAuthToken(token:string){
    return parseToken(token).username
}