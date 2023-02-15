

export const doApiCallForVideosData = async (URL,value='') => {
   
    try {  
      const response = await fetch(URL+value, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      }).then(result => { return result.json() }).catch(err => console.log(err));

      return  {
        statusCode:'200',
        videoDataArray:response.videos,
      }
    }
    catch (err) {
        return {
            statusCode:'400',
        }
    }
  }