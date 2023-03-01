import { loginApi } from "../../constants/ApiConstants"
import { StatusCodes } from "../../constants/StatusCode"

export const verifyUserDetail = async (userDetails) => {

    
    try {
        const response = await fetch(loginApi, {
            method: "POST",
            body: JSON.stringify(userDetails)
        }).then(result => { return result.json() }).catch(err => console.log(err))   
        if(response.status_code>=StatusCodes.errorCode){
            return  {
                status:'Fail',
                statusCode:response?.status_code,
                errorMsg:response?.error_msg,
            }
        }  
        else{
            return {
                status:'Success',
                statusCode:StatusCodes.successCode,
                jwtToken:response?.jwt_token,
            }
        } 

    }
    catch (err) {
        console.log("fail to verifyUserDetails",err); 
    }
}
