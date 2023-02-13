import React from 'react'
import { useContext } from 'react'
import StoreContext from '../../Context'
import Icons from '../Icons'
import './index.css'

export default function BannerComponent(props) {
    const { children ,iconName } = props
    const { currentTheme } = useContext(StoreContext)
    return (
        <div className="banner" style={{ backgroundColor: currentTheme?.bannerBgColor }}>
            <div className="banner-content">
                <div className="banner-logo" style={{ backgroundColor: currentTheme.themeName === 'light' ? "#d7dfe9" : '#000000' }}>
                        <div>{<Icons iconName={iconName} iconColor='#ff0000'/>}</div>
                </div>
                <p className='banner-heading' style={{ color: currentTheme.normalTextColor }}>{children}</p>
            </div>
        </div>
    )
}
