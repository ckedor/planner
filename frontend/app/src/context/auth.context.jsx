import { useState, useEffect, createContext } from 'react';
import jwt_decode from 'jwt-decode'
import config from '../config';
import { useNavigate } from 'react-router-dom'

const API_TOKEN_URL = config.API_URL + 'token/'
const API_REFRESH_TOKEN_URL = config.API_URL + 'token/refresh/'

const AuthContext = createContext()
export default AuthContext;

export const AuthProvider = ({children}) => {
    
    const [authTokens, setAuthTokens] = useState(() => {
        return localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null
    })
    const [user, setUser] = useState(() => {
        return localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')) : null
    })
    const [wrongCredentialsError, setWrongCredencialsError] = useState(false)
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate()

    const login = async (e, username, password) => {
        
        e.preventDefault()
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: username, password: password})
        };
        fetch(API_TOKEN_URL, requestOptions)
            .then((response) => {
                if (response.ok){
                    return response.json()
                }
                else {
                    alert("Erro ao buscar o token na API")
                }
            })
            .then(data => {
                if (data){
                    setAuthTokens(data)
                    setUser(jwt_decode(data.access))
                    localStorage.setItem('authTokens', JSON.stringify(data))
                    navigate("/dashboard", { replace: true })
                }
                else{
                    setWrongCredencialsError(true)
                }
            });
    } 

    const logout = () => {
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem('authTokens')
    }

    let updateToken = async () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 'refresh': authTokens?.refresh })
        };
        fetch(API_REFRESH_TOKEN_URL, requestOptions)
            .then((response) => {
                if (response.ok){
                    return response.json()
                }
                else {
                    alert("Algo deu errado")
                }
            })
            .then(data => {
                if (data){
                    setAuthTokens(data)
                    setUser(jwt_decode(data.access))
                    localStorage.setItem('authTokens', JSON.stringify(data))
                }
                else{
                    logout()
                }
            });
        
            if (loading){
                setLoading(false)
            }
    }

    const contextData = {
        user:user, 
        authTokens:authTokens,
        wrongCredentialsError:wrongCredentialsError,
        login:login,
        logout:logout
    }

    useEffect(()=>{
        if(!authTokens) {
            setLoading(false)
            return 
        }
        if(loading){
            updateToken()
        }

        let fourMinutes = 1000 * 60 * 4
        let interval = setInterval(() => {
            if(authTokens){
                updateToken()
            }
        }, fourMinutes)
        return () => clearInterval(interval)

    }, [authTokens, loading])
    

    return(
        <AuthContext.Provider value={contextData}>
            { loading ? null : children }
        </AuthContext.Provider>
    )
}