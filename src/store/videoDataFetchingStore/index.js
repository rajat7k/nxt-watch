import { action, decorate, observable } from "mobx"
import { StatusCodes } from "../../constants/StatusCode"
import { doApiCallForVideosData } from "../../utils/ApiUtils/VideosDataApi"


class VideoDataFetchStore{

    videoDataApiResponse={}

    constructor(){
        this.videoDataApiResponse={
            statusCode:StatusCodes.initialCode
        }
    }

    async fetchVideoData(url){
        const response=await doApiCallForVideosData(url)
        this.videoDataApiResponse=response
    }

}

decorate(VideoDataFetchStore,{
    videoDataApiResponse:observable,
    fetchVideoData:action
})

export default VideoDataFetchStore