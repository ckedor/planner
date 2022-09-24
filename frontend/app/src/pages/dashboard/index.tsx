import React, { useContext } from 'react';
import NavbarComponent from '../../components/navbar/navbar.component';
import { AuthContext } from '../../context/AuthContext';
import { withAuth } from '../../services/auth';

type Documentos = {

}

const Documentos = ({ documentos }:{ documentos: Documentos[] }) => {

    const { username } = useContext(AuthContext)

    return (
        <>
        <NavbarComponent/>
        </>
    );
};

export default Documentos;

export const getServerSideProps = withAuth( async(ctx:any) => {

    return {
        props: {}
    }
})