import React, { useContext } from 'react';
import NavbarComponent from '../../components/navbar/navbar.component';
import { AuthContext } from '../../context/AuthContext';
import { withAuth } from '../../services/auth';


const Documentos = () => {

    const { username } = useContext(AuthContext)
    return (
        <>
        <NavbarComponent/>
        </>
    );
};

export default Documentos;