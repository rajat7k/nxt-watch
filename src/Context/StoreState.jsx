import React, { useState } from 'react'
import StoreContext from '.'

const StoreState = (props) => {
    const { children } = props

    const [savedVideos, setSavedVideos] = useState([]);
    const [likedVideos, setLikedVideos] = useState([]);
    const [dislikedVideos, setDislikedVideos] = useState([]);

    const darkTheme = {
        themeName: "dark",
        homeBackgroundColor: "#181818",
        layoutBackgroundColor: "#231f20",
        textColor: "#ffffff",
        menuActiveItmeBackgroundColor: "#383838",
        normalTextColor: "#ffffff",
        searchBarIconBgColor: "#64748b",
        videoDetailColor: '#64748b',
        allPageBgColor: '#0f0f0f',
        bannerBgColor: '#181818',

    }
    const lightTheme = {
        themeName: "light",
        homeBackgroundColor: "#f9f9f9",
        menuActiveItmeBackgroundColor: "#d7dfe9",
        menuItemTextColor: "#64748b",
        normalTextColor: "#231f20",
        videoDetailColor: '#64748b',
        allPageBgColor: '#f9f9f9',
    }

    const [currentTheme, setCurrentTheme] = useState(lightTheme);


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