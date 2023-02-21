import { StatusCodes } from "../../constants/StatusCode";


export const doApiCallForVideosData = async (URL) => {
   
    try {  
      const response = await fetch(URL, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt_token")}`
        }
      }).then(result => { return result.json() }).catch(err => console.log(err));
      return  {
        statusCode:StatusCodes.successCode,
        videoDataArray:response.videos,
      }
    }
    catch (err) {
        return {
            statusCode:StatusCodes.errorCode,
        }
    }
  }

  export const doApiCallForVideoDetail=async(URL)=>{
    try {
      const response = await fetch(URL, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt_token")}`
        }
      }).then(result => { return result.json() }).catch(err => console.log(err));
      return {
        statusCode:StatusCodes.successCode,
        data:response.video_details
      }
    }
    catch (err) {
      console.log(err)
    }
  }