import { Component } from "react";
import { Navigate } from "react-router-dom";

class LoginRequired extends Component{

    render(){
        var token = localStorage.getItem("token")

        if (!token){
            return <Navigate to="/login" replace />;
        }
        return (<div></div>)
    }


}

export default LoginRequired