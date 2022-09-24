import { createContext, useEffect, useState } from "react";
import API_URL from "../config";
import axios from 'axios'
import { setCookie, parseCookies } from 'nookies'
import { getUsernameFromAuthToken, isTokenExpired } from "../services/auth";
import Router, { useRouter } from 'next/router'
import { deleteCookie } from "cookies-next";

type AuthContextType = {
    username: string | null;
    isAuthenticated: boolean;
    signIn: (data: SignInData) => Promise<void>
    signOut: () => Promise<void>
}

type SignInData = {
    username: string | null;
    password: string;
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthProvider({ children }:{children:any}){
    console.log("Entrou no authprovider")
    const [username, setUsername] = useState<string | null>(null)
    const [loading, setLoading] = useState(true)

    const isAuthenticated = !!username;
    const router = useRouter()
    const cookieOptions = {maxAge: 60 * 60 * 24 * 30, 
        secure: process.env.NODE_ENV === 'production' ? true : false,
        path: '/'}
      
    useEffect(() => {
        
        const { authTokens } = parseCookies()
        if (!authTokens){
            setLoading(false)
            return
        } 
        if(loading){
            const refreshToken = JSON.parse(authTokens).refresh
            refreshAccessToken(refreshToken)
        } 
        
        let fourMinutes = 1000 * 60 * 4
        let interval = setInterval(() => {
            if(authTokens){
                const refreshToken = JSON.parse(authTokens).refresh
                refreshAccessToken(refreshToken)
            }
        }, fourMinutes)
        return () => clearInterval(interval)


    }, [loading, username])

    async function refreshAccessToken(refreshToken:string) {
        const http = axios.create({baseURL: API_URL});

        const body = JSON.stringify({ 'refresh':  refreshToken })
        const requestOptions = { headers: { 'Content-Type': 'application/json' }};
        const {data} = await http.post("token/refresh/", body, requestOptions)
        const authTokens = JSON.stringify(data)
        setCookie(undefined, 'authTokens', authTokens, cookieOptions)
        setUsername(getUsernameFromAuthToken(data.access))
        if (loading){
            setLoading(false)
        }
        console.log("Atualizou o token")
    }

    async function signIn({ username, password }: SignInData){
        const apiService = axios.create({baseURL: API_URL});
        const body = {
            username: username,
            password: password
        }

        const requestOptions = { headers: {'Content-Type':'application/json'}} 
        const {data} = await apiService.post("token/", body, requestOptions)
        const authTokens = JSON.stringify(data)
        setCookie(undefined, 'authTokens', authTokens, cookieOptions)
        if (router.pathname === "/login"){
            await router.push('/dashboard')
        } else{
            await router.push(router.pathname)
        }
        setUsername(getUsernameFromAuthToken(data.access))
    }

    async function signOut(){
        deleteCookie("authTokens")
        await router.push('/login')
        setUsername(null)
    }

    return (
        <AuthContext.Provider value={{ username, isAuthenticated, signIn, signOut}}>
            { loading ? null : children }
        </AuthContext.Provider>
    )
}