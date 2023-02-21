import { assign, createMachine } from "xstate";
import { StatusCodes } from "../constants/StatusCode";
import { doApiCallForVideosData } from "../utils/ApiUtils/VideosDataApi";

export const videoDataFetchMachine = createMachine({
    predictableActionArguments: true,
    id: 'videoDataFetchMachine',
    initial: 'idle',
    context:{
        videoDataApiResponse:{},
    },
    states: {
        idle: {
           on:{
            GET_VIDEO_DATA:{
                target:'loading',
                actions: assign({
                    videoDataApiResponse: () => {
                        return { statusCode: StatusCodes.processingCode }
                    }
                })
            }
           }
        },
        loading:{
            invoke: {
                src: (context, event) =>doApiCallForVideosData(event.url),
                onDone: {
                    target:'#videoDataFetchMachine',
                    actions: 'assignVideoDataApiResponse'
                },
            }
        }
    },

},
    {
        actions: {
            assignVideoDataApiResponse: assign({
                videoDataApiResponse: (context, event) => {
                    return event.data;
                }
            }),
        }
    }
)