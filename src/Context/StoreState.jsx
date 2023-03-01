import React, { useState } from 'react'
import StoreContext from '.'
import { darkTheme, lightTheme } from '../constants/ThemeConstants';


const StoreState = (props) => {
    const { children } = props


    const [currentTheme, setCurrentTheme] = useState(lightTheme);

    const handleClickOnDarkTheme = () => {
        if (currentTheme.themeName === 'dark') {
            setCurrentTheme(lightTheme);
        }
        else {
            setCurrentTheme(darkTheme);
        }
    }

    return (
        <StoreContext.Provider value={{
            currentTheme, handleClickOnDarkTheme,
        }} >
            {children}
        </StoreContext.Provider>
    )
}

export default StoreState