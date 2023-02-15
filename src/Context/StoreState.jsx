import React, { useState } from 'react'
import StoreContext from '.'
import { darkTheme, lightTheme } from '../constants/ThemeConstants';

const StoreState = (props) => {
    const { children } = props

    const [savedVideos, setSavedVideos] = useState([]);
    const [likedVideos, setLikedVideos] = useState([]);
    const [dislikedVideos, setDislikedVideos] = useState([]);



    const [currentTheme, setCurrentTheme] = useState(darkTheme);


    const handleClickOnDarkTheme = () => {
        if (currentTheme.themeName === 'dark') {
            setCurrentTheme(lightTheme);
        }
        else {
            setCurrentTheme(darkTheme);
        }
    }

    const handleSavedVideosData = (video) => {

        const index = savedVideos.findIndex(item => item.id === video.id);

        if (index !== -1) {

            savedVideos.splice(index, 1);
        }
        else {
            savedVideos.push(video);
        }
        setSavedVideos(savedVideos);

    }

    const handleLikedVediosData = (id) => {
        const index = likedVideos.indexOf(id);

        if (index !== -1) {

            likedVideos.splice(index, 1);

        }
        else {
            likedVideos.push(id);
        }
        setLikedVideos(likedVideos);
    }

    const handleDisLikedVediosData = (id) => {
        const index = dislikedVideos.indexOf(id);

        if (index !== -1) {

            dislikedVideos.splice(index, 1);

        }
        else {
            dislikedVideos.push(id);
        }
        setDislikedVideos(dislikedVideos);
    }

    return (
        <StoreContext.Provider value={{
            savedVideos, handleSavedVideosData,
            likedVideos, handleLikedVediosData,
            dislikedVideos, handleDisLikedVediosData,
            currentTheme, handleClickOnDarkTheme,

        }} >
            {children}
        </StoreContext.Provider>
    )
}

export default StoreState