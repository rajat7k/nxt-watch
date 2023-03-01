import AuthStoreMobx from "./authStore";
import ThemeStore from "./themeStore";
import VideoDetailStore from "./videDetailStore";
import VideoDataFetchStore from "./videoDataFetchingStore";

class RootStore{

    constructor(){
        this.authStore=new AuthStoreMobx()
        this.homeVideoDataFetchStore=new VideoDataFetchStore()
        this.trendingVideoDataFetchStore=new VideoDataFetchStore()
        this.gamingVideoDataFetchStore=new VideoDataFetchStore()
        this.videoDetailStore=new VideoDetailStore()
        this.themeStore=new ThemeStore();
    }
}

const rootStore=new RootStore();
export default rootStore