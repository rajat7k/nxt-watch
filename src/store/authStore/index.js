import { action, autorun, decorate, observable } from 'mobx'
import { StatusCodes } from '../../constants/StatusCode';
import { verifyUserDetail } from "../../utils/ApiUtils/LoginVerificationApi";

class AuthStoreMobx{
    response={}
    constructor(){
        autorun(()=>{
            if(this.response?.jwtToken!==undefined){
                localStorage.setItem('jwt_token', this.response.jwtToken)
            }
        })       
    }
    async tryLogin(userDetails){
        this.response={
            statusCode:StatusCodes.initialCode
        }
        this.response={
            statusCode:StatusCodes.processingCode
        }
       const response= await verifyUserDetail(userDetails)
       this.response=response
    }
    Logout(){
        localStorage.removeItem('jwt_token')
    }
}

decorate(AuthStoreMobx,{
    response:observable,
    tryLogin:action,
    Logout:action
})

export default AuthStoreMobx