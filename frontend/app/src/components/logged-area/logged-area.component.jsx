import { Component } from 'react'
import { Outlet } from 'react-router-dom';
import LoginRequired from '../login_required/login_required.component'
import NavbarComponent from '../navbar/navbar.component';

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
        var url = 'http://127.0.01:8000/users/current_user';
        console.log(token)
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
                else{
                    
                }
            }
            );
    }

  render(){
    const { handleLogout } = this;
    const { user } = this.state;

    if (localStorage.getItem('token') && !user ){
      this.getUser(localStorage.getItem('token'))
    }

    return (
      <div>
        <LoginRequired></LoginRequired>
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
