import React from 'react'
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute(props) {

    const { children } = props;

    if (localStorage.getItem("token")) {
        return children;
    }
    else {
        return <Navigate to='/login' />
    }

}
