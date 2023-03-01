import { action, decorate, observable } from "mobx"
import { StatusCodes } from "../../constants/StatusCode"
import { doApiCallForVideoDetail } from "../../utils/ApiUtils/VideosDataApi"


class VideoDetailStore {

    savedVideos = []
    likedVideos = []
    dislikedVideos = []
    videoDetail = {}
    async GetVideoDetail(url) {
        this.videoDetail = {
            statusCode: StatusCodes.initialCode
        }
        const response = await doApiCallForVideoDetail(url)
        this.videoDetail = response
    }

    SaveVideo(video) {
        const index = this.savedVideos.findIndex(item => item.id === video.id);
        if (index !== -1) {
            this.savedVideos.splice(index, 1);
        }
        else {
            this.savedVideos.push(video);
        }
    }
    LikeVideo(id) {
        const index = this.likedVideos.indexOf(id);

        if (index !== -1) {
            this.likedVideos.splice(index, 1);
        }
        else {
            this.likedVideos.push(id);
        }
    }
    DislikeVideo(id){
        const index = this.dislikedVideos.indexOf(id);

        if (index !== -1) {
            this.dislikedVideos.splice(index, 1);
        }
        else {
            this.dislikedVideos.push(id);
        }
    }

}

decorate(VideoDetailStore, {
    savedVideos: observable,
    likedVideos: observable,
    dislikedVideos: observable,
    videoDetail: observable,
    GetVideoDetail: action,
    SaveVideo: action,
    LikeVideo:action,
    DislikeVideo:action
})


export default VideoDetailStore