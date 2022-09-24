import type { NextPage } from 'next'
import Router from 'next/router'
import { useContext, useEffect } from 'react'
import NavbarComponent from '../components/navbar/navbar.component'
import { AuthContext } from '../context/AuthContext'

const Home: NextPage = () => {

  const {isAuthenticated} = useContext(AuthContext)
  if (!isAuthenticated){
    Router.push('/login')
  }
  
  useEffect( () =>{
  }, [])
  
  return (
    <>
    <NavbarComponent/>
    </>
  )
}

export default Home
