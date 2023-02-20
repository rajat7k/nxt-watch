import { createMachine } from "xstate";

const verifyUserDetail = async (userDetails,URL) => {
    try {
        const response = await fetch(URL, {
            method: "POST",
            body: JSON.stringify(userDetails)
        }).then(result => { return result.json() }).catch(err => console.log(err))


        if (response.status_code === 400) {
            console.log(response.error_msg)
            // setApiErrorResponse(response.error_msg)
        }
        else {
            localStorage.setItem("token", response.jwt_token)
            // setPassword('');
            // setUserName('');
            // navigate(redirectTo!==undefined?redirectTo:'/');
        }

    }
    catch (err) {
        console.log(err);
    }
    // setShowLoader(false)
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
                            target:'.checkUserDetails'
                        }
                    },
                    states:{
                        checkUserDetails:{
                            invoke:{
                                id:'verifyUserDetail',
                                src:(context,event)=>verifyUserDetail(event.userDetails),
                                onDone:{
                                    target:"",
                                    actions:()=>{

                                    }
                                },
                                onError:{
                                    target:'',
                                    actions:()=>{
                                        
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