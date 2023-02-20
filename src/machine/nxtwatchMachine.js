import { assign, createMachine } from "xstate";
import { loginApi } from "../constants/ApiConstants";

const verifyUserDetail = async (userDetails) => {

    
    try {
        const response = await fetch(loginApi, {
            method: "POST",
            body: JSON.stringify(userDetails)
        }).then(result => { return result.json() }).catch(err => console.log(err))

        const responseToSend={
            statusCode:response?.status_code,
            errorMsg:response?.error_msg,
            jwtToken:response?.jwt_token,
        }        
        return  new Promise((resolve,reject)=>{
            if(response.status_code>=400){
                return  reject(responseToSend)
            }  
            else{
                return resolve(responseToSend)
            } 
        })

    }
    catch (err) {
        console.log("fail to verifyUserDetails",err); 
    }
}



export const nxtwatchMachine=

/** @xstate-layout N4IgpgJg5mDOIC5QDsAeAXA7gQ3QYwAsBZbQgS2TADoyIAbMAYgG0AGAXUVAAcB7WMujK9kXEKkQBGAGwBmKgE4A7ApnTpC1qwAsknQBoQATykKArFVmtNsgEy3Z2gBy6lAXzeG0WXIRLlKGnomZklOJBA+ASERMQkEaVtDEwRtOSpbJ1ZZBQ1tWUdzDy8MHHxiUgIKajpeKAoAZXRcJgAZAHkAcQBJADk2cJ5+QWFRCPinJWTEaVYlKidJW1YnZaVJBVXbYpBvMr9K6qpa+uQmlqpCMDwAawBVWDAAJwARMGayOlhGCBFqCgAbrwbtQAc8yAAzIwPZ5vD50AZiKIjWLjRC6CzSMxOLLabS2MxKJQE2TTBDYyRUJTqOYKWzKWaOHZ7XwVAI1OqNZroahXW4w17vbCfb7PJ68J5Ubh0XAQiUAWyoYKekOhj0F8MREWRMTGoHiGKoWJxOnxhOJZlJxkQSlYlPyZnpZlmCk2sicHk8u14EDgYhZ5X8VUoSOGuriiAAtAoyZHpMzSqyg0daAxQ9FRhHUklrQhFlRtCpJNTMptzHaEz5A4dAicuS10yi9eJEDkyY7WFRJLI5LZJNprHMzApK-s2cGOadzjzLgRrvd1XDhV9G+G0QgNk4qJbpPlpJJFssnNIprnZvN92ZtITWJl9x6vQGDuyqABXdXTsCrzPr3fSbe5PS6iSFesxmGSaRbtS5jOtITjDpoOiem4QA */
createMachine(
        {
            predictableActionArguments: true,
            id:'nxtwatchMachine',
            initial:'idle',
            context:{
                token:'',
                loginApiResponse:{
                },
            },
            states:{
                idle:{
                    always:[
                        {
                            target:'loginState',
                            cond:(context)=>{
                                return context.token==='';
                            }
                        },
                        {
                            target:'userState'
                        }
                    ]
                },
                loginState:{
                    on:{
                        LOGIN:{
                            target:'.checkUserDetails',
                            actions:assign({
                                loginApiResponse:()=>{
                                    return {status:'pending'}
                                }
                            })
                        }
                    },
                    states:{
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
                },
                userState:{
                    id:'userState',

                }
            }
        },
        {
            actions:{
                saveTokenToLocalStorage:(context,event)=>{
                        localStorage.setItem('jwt_token',event.data.jwtToken);
                },
                assignLoginApiResponse:assign({
                    loginApiResponse:(context, event) => {
                        return event.data;
                      }
                }),
            }
        }
)