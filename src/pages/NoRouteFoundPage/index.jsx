import React from 'react'
import Layout from '../../components/Layout'
import './index.css'

export default function NoRouteFoundPage() {
    return (
        <Layout>
            <div className="route-not-found-page">
                <img src="https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png" alt="" />
                <div>
                    <p className='page-not-found-heading'>Page Not Found</p>
                    <p>We are sorry, the page you requested could not be found</p>
                </div>
            </div>
        </Layout>
    )
}
