import React, { useState } from 'react'
import StoreContext from '.'

const StoreState = (props) => {
    const { children } = props

    const [savedVideos, setSavedVideos] = useState([]);

    const handleClickOnSavedVideo = (video) => {
        savedVideos.push(video);
        setSavedVideos(savedVideos);
    }

    return (
        <StoreContext.Provider value={{ savedVideos, handleClickOnSavedVideo }} >
            {children}
        </StoreContext.Provider>
    )
}

export default StoreState