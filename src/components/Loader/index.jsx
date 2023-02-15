import React from 'react'
import { RotatingLines } from 'react-loader-spinner'
import './index.css'

export default function Loader() {

    return <div className="display-loader">
        <RotatingLines
            height="80"
            width="80"
            radius="48"
            color="#4fa94d"
            ariaLabel="watch-loading"
            visible={true}
        />
    </div>
}
