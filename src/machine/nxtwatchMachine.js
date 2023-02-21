import { assign, createMachine } from "xstate";
import { StatusCodes } from "../constants/StatusCode";
import { doApiCallForVideoDetail } from "../utils/ApiUtils/VideosDataApi";


export const nxtwatchMachine = createMachine({
    predictableActionArguments: true,
    id: 'nxtwatchMachine',
    initial: 'idle',
    context: {
        savedVideos: [],
        likedVideos: [],
        dislikedVideos: [],
        videoDetail: {

        }
    },
    states: {
        idle: {
            on: {
                GET_VIDEO_DETAIL: {
                    target: 'fetchVideoDetail',
                    actions: assign({
                        videoDetail: () => {
                            return { statusCode: StatusCodes.processingCode }
                        }
                    })
                },
                SAVE_VIDEO: {
                    actions:assign({
                        savedVideos: (context, event) => {
                            const index = context.savedVideos.findIndex(item => item.id === event.video.id);
            
                            if (index !== -1) {
                                context.savedVideos.splice(index, 1);
                            }
                            else {
                                context.savedVideos.push(event.video);
                            }
                            return context.savedVideos
                        }
                    })
                },
                LIKED_VIDEO:{
                    actions:assign({
                        likedVideos:(context,event)=>{
                            const id=event.id;
                            const likedVideos=context.likedVideos
                            const index = likedVideos.indexOf(id);

                            if (index !== -1) {
                    
                                likedVideos.splice(index, 1);
                    
                            }
                            else {
                                likedVideos.push(id);
                            }
                            return likedVideos;
                        }
                    })
                },
                DISLIKED_VIDEO:{
                    actions:assign({
                        dislikedVideos:(context,event)=>{
                            const id=event.id;
                            const dislikedVideos=context.dislikedVideos
                            const index = dislikedVideos.indexOf(id);

                            if (index !== -1) {
                    
                                dislikedVideos.splice(index, 1);
                    
                            }
                            else {
                                dislikedVideos.push(id);
                            }
                            return dislikedVideos;
                        }
                    })
                }
            }
        },
        fetchVideoDetail: {
            invoke: {
                src: (context, event) => doApiCallForVideoDetail(event.url),
                onDone: {
                    target: '#nxtwatchMachine',
                    actions: 'assignVideoDetailApiResponse'
                },
            }
        }

    },
    on: {
        LOGOUT: {
            actions: ['removeTokenFromLocalStorage',]
        },
        
    }

},
    {
        actions: {
            removeTokenFromLocalStorage: (context, event) => {
                localStorage.removeItem('jwt_token')
            },
            assignVideoDetailApiResponse: assign({
                videoDetail: (context, event) => {
                    return event.data;
                }
            }),
        }
    }
)