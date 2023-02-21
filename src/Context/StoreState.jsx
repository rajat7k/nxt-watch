import { useInterpret } from '@xstate/react';
import React, { useState } from 'react'
import StoreContext from '.'
import { darkTheme, lightTheme } from '../constants/ThemeConstants';
import { nxtwatchMachine } from '../machine/nxtwatchMachine';


const StoreState = (props) => {
    const { children } = props

    const userStateMachine = useInterpret(nxtwatchMachine)

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
            userStateMachine,

        }} >
            {children}
        </StoreContext.Provider>
    )
}

export default StoreState