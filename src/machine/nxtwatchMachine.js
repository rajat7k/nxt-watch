import { actions, assign, createMachine } from "xstate";
import { loginApi } from "../constants/ApiConstants";
import { StatusCodes } from "../constants/StatusCode";

const verifyUserDetail = async (userDetails) => {

    
    try {
        const response = await fetch(loginApi, {
            method: "POST",
            body: JSON.stringify(userDetails)
        }).then(result => { return result.json() }).catch(err => console.log(err))   
        return  new Promise((resolve,reject)=>{
            if(response.status_code>=StatusCodes.errorCode){
                return  reject({
                    status:'Fail',
                    statusCode:response?.status_code,
                    errorMsg:response?.error_msg,
                })
            }  
            else{
                return resolve({
                    status:'Success',
                    statusCode:StatusCodes.successCode,
                    jwtToken:response?.jwt_token,
                })
            } 
        })

    }
    catch (err) {
        console.log("fail to verifyUserDetails",err); 
    }
}



export const nxtwatchMachine=

/** @xstate-layout N4IgpgJg5mDOIC5QDsAeAXA7gQ3QYwAsBZbQgS2TADoyIAbMAYgG0AGAXUVAAcB7WMujK9kXEKkQBGAGySqAJlZLW8gKyLVAZkmSA7ABoQAT0QAOOauXyALNOurrATlayAvq8NosuQiXKUaeiZmSU4kED4BIRExCQQZOUUrdVYtHQNjRHlTRypNXVUZHK1HU1YZd08MHHxiUgIKajpeKAoAZXRcaloGABkW9s70Jl6AeQBxAEkAOTYwnn5BYVFwuML5KnMbR0dpaXlpTWlTQxMETVZrKnty1k1NR3tNNWlKkC8a33rGqmbW5A6XSohDAeAA1gBVWBgABOABEwJ0yHRYIwICJusgAG68MHULGwsgAMyMUNhCKRdDmYkiSxiqzM1gs+0s0gK2m00lOWSUVGUrAKd3k8kckl2bw+Pjq-iaAwBQ2oIPBZPhiOwyNRsJhvBhVG4dFwRJ1AFsqASYcTSdDVZTqeFadEVqA4qYmVRVCyXOzJJzuedFAolDpnLo9uoChLqlK-A0AgBXa2A4aMMbjUYQgAqdoWUWWsSyulyWy0NlUunKez9bOkVHLFYKqkcWk01ncHnevAgcDEktqMcaNMWjvzCAAtFzMmPVFQdrO53PdPJI94+98Aj0wIPc-TnYhrPI-dlEqxXbprKG2WVTMvPtLY7L-knN-ah3mGecXHz8oVF44Lh6W0PGRNgKSQDlUMpnFdSQb2jNcH0GIEN36R8FS3OknXERBNAcL9QN-f9DmsP1nl0EDCk0cwwIufJYNXGVfjlJ9gQIUFIWtCl1RRdDh3ffYriZNQXBUVIHkkEjLjyUD1gOB5HDor4GITWEnx4t9dwQJwq3sTYg1MUCmxUGD217RT7yoZSYWYjcVVUl9t0wuJHAyM5dHuPIlHkMCZCcRx5F0NtXCAA */
createMachine(
        {
            predictableActionArguments: true,
            id:'nxtwatchMachine',
            initial:'idle',
            context:{
                
                loginApiResponse:{
                },
            },
            states:{
                idle:{
                    always:[
                        {
                            target:'userState',
                            cond:(context)=>{
                                return localStorage.getItem('jwt_token') ;
                            }
                        },
                        {
                            target:'loginState'
                        }
                    ]
                },
                loginState:{
                    id:'loginState',
                    states:{
                        idleLoginState:{
                            on:{
                                LOGIN:{
                                    target:'checkUserDetails',
                                    actions:assign({
                                        loginApiResponse:()=>{
                                            return {statusCode:StatusCodes.processingCode}
                                        }
                                    })
                                }
                            },
                        },
                        checkUserDetails:{
                            invoke:{
                                id:'verifyUserDetail',
                                src:(context,event)=>verifyUserDetail(event.userDetails),
                                onDone:{
                                    target:"#userState",
                                    actions:['assignLoginApiResponse','saveTokenToLocalStorage']
                                        
                                    
                                   
                                },
                                onError:{
                                    target:'#nxtwatchMachine',
                                    actions:'assignLoginApiResponse'
                                }
                            }
                        }
                    }
                    ,
                    initial:'idleLoginState'
                    
                },
                userState:{
                    id:'userState',
                    on:{
                        LOGOUT:{
                            target:"#nxtwatchMachine",
                            actions:['removeTokenFroLocalStorage','resetContextValues']
                        }
                    },
                   
                }
            }
        },
        {
            actions:{
                saveTokenToLocalStorage:(context,event)=>{
                        localStorage.setItem('jwt_token',event.data.jwtToken);
                },
                removeTokenFroLocalStorage:(context,event)=>{
                    console.log("working")
                        localStorage.removeItem('jwt_token')
                },
                assignLoginApiResponse:assign({
                    loginApiResponse:(context, event) => {
                        return event.data;
                      }
                }),
                resetContextValues:assign({
                    loginApiResponse:(context, event) => {
                        return {};
                      }
                }),
            }
        }
)