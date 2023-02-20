import React from 'react'
import { Navigate, useLocation } from 'react-router-dom';


export default function ProtectedRoute(props) {

    const { children } = props;
    const prevLocation = useLocation().pathname;

    if (localStorage.getItem("jwt_token")) {
        return children;
    }
    else {
        return <Navigate to={`/login?redirectTo=${prevLocation}`} />
    }

}
