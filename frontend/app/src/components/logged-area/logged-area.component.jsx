import { Component } from 'react'
import { Outlet, Navigate } from 'react-router-dom';
import NavbarComponent from '../navbar/navbar.component'
import config from '../../config'

class LoggedArea extends Component {

  constructor(){
    super();

    this.state = {
      token: '',
      user: null
    }

    this.handleLogout = this.handleLogout.bind(this)
    this.getUser = this.getUser.bind(this)
  }

  handleLogout(){
    this.setState({token:undefined})
  }

  getUser(token){
        const url = config.API_URL + 'users/current_user';
        const requestOptions = {
            headers: { 'Content-Type': 'application/json', 'Authorization': 'Token ' + token}
        };
        fetch(url, requestOptions)
            .then((response) => {
                if (response.ok){
                    return response.json()
                } 
                else 
                    return null
            })
            .then(data => {
                if (data){
                    this.setState({user:data})
                }
            }
            );
    }

  render(){
    const { handleLogout } = this;
    const { user } = this.state;

    const token = localStorage.getItem('token')

    if (!token){
      return <Navigate to="/login" replace />;
    }
    if (token && !user ){
      this.getUser(token)
    }
    return (
      <div>
        <NavbarComponent 
          handleLogout={handleLogout}
          loggedIn={true} 
          user={user}/>
        <Outlet />
      </div>
    )
  }
}

export default LoggedArea;
