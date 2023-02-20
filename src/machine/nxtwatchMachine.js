import { createMachine } from "xstate";
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
        return responseToSend;
    

    }
    catch (err) {
        console.log("fail to verifyUserDetails",err); 
    }
}



export const nxtwatchMachine=
/** @xstate-layout N4IgpgJg5mDOIC5QDsAeAXA7gQ3QYwAsBZbQgS2TADoyIAbMAYgG0AGAXUVAAcB7WMujK9kXEKkQBaAKxUAbAE5WCgOwKALCukr1CuQBoQATykAmBQA4q006wvrWAZlYBGddIvSAvl8NosuIQk5JQ09EzMLpxIIHwCQiJiEggy8kqqGlo6eoYmKaY21rrqFhZyKmqmjo5yPn4YOPjEpAQU1HS8UBQAyui4TAAyAPIA4gCSAHJs0Tz8gsKiMcmSKqbyKq7qjtIKCqb2KgbGiC57VCqOpnKncvt6bnUg-o1BLW1UHV3Ivf1UhGB4ADWAFVYGAAE4AETAfTIdFgjAgImoFAAbrxAdRURCyAAzIygiHQ2F0aZiOLzRJLRCOFzWbYeZymdQFVjqXInS5UbblaQ1PZyCymFyPZ6BZohdqdHp9dDUf5AwlQmHYOEIiHg3jgqjcOi4XFagC2VGx4LxBLBypJZJiFISi1AyS5tmufMcqhUnmk0iOeXsVCULlYpg2ijcim8ot4EDgYjFTWCrUo5Lm9qSUhcWnWm22u32ml9UkcZSorDLZc8jncrAjooa4sT71oDBT8QW6ZSLhD2bcub2B0L+QUjioZWkwekmcU6kFdYCCbeoU+Mv6rcpDvEGdsPa2O37BY5+WsnrcLhccndm10jjnLwlSalXx+cr+BABIMtxNV8LXaepCHUOkBVsCxgxZcd2WOBAXH9CwuxKJxz2FVZal8J56wXSUqAAV0tZ8wF-dt-0kM81nKHM93zQ5D0uVgqCuIUa2HVQbHUHwfCAA */
createMachine(
        {
            predictableActionArguments: true,
            id:'nxtwatchMachine',
            initial:'idle',
            context:{
                token:'',

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
                        }
                    },
                    states:{
                        checkUserDetails:{
                            invoke:{
                                id:'verifyUserDetail',
                                src:(context,event)=>verifyUserDetail(event.userDetails),
                                onDone:{
                                    target:"#nxtwatchMachine",
                                    actions:(context,event)=>{
                                        console.log("loging Success")
                                        console.log(event.data)

                                    }
                                },
                                onError:{
                                    target:'',
                                    actions:(context,event)=>{
                                        console.log("login fail")
                                        console.log(event.data)
                                    }
                                }
                            }
                        }
                    }
                },
                userState:{

                }
            }
        }
)