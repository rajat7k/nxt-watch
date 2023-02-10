import React, { useState } from 'react'
import StoreContext from '.'

const StoreState = (props) => {
    const { children } = props

    const [savedVideos, setSavedVideos] = useState([]);
    const [likedVideos, setLikedVideos] = useState([]);
    const [dislikedVideos, setDislikedVideos] = useState([]);

    const handleSavedVideosData = (video, action) => {

        const index = savedVideos.findIndex(item => item.id === video.id);

        if (index !== -1) {
            if (action === 'remove') {
                savedVideos.splice(index, 1);
            }
        }
        else {
            savedVideos.push(video);
        }
        setSavedVideos(savedVideos);

    }

    const handleLikedVediosData = (id, action) => {
        const index = likedVideos.findIndex(val => val === id);

        if (index !== -1) {
            if (action === 'remove') {
                likedVideos.splice(index, 1);
            }
        }
        else {
            likedVideos.push(id);
        }
        setLikedVideos(id);
    }

    const handleDisLikedVediosData = (id, action) => {
        const index = dislikedVideos.findIndex(val => val === id);

        if (index !== -1) {
            if (action === 'remove') {
                dislikedVideos.splice(index, 1);
            }
        }
        else {
            dislikedVideos.push(id);
        }
        setDislikedVideos(dislikedVideos);
    }

    return (
        <StoreContext.Provider value={{
            savedVideos,
            likedVideos,
            dislikedVideos,
            handleSavedVideosData,
            handleLikedVediosData,
            handleDisLikedVediosData,
        }} >
            {children}
        </StoreContext.Provider>
    )
}

export default StoreState