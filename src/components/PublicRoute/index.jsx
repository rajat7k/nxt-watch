import React from 'react'
import { Navigate } from 'react-router-dom'

function PublicRoute(props) {
    const { children } = props
    if (localStorage.getItem("token")) {
        return <Navigate to='/' />
    }
    else {
        return children;
    }
}

export default PublicRoute