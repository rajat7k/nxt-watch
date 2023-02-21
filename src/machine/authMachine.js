import { assign, createMachine } from "xstate";
import { StatusCodes } from "../constants/StatusCode";
import { verifyUserDetail } from "../utils/ApiUtils/LoginVerificationApi";

export const authMachine = createMachine(
        {
            predictableActionArguments: true,
            id: 'loginState',
            context: {
                loginApiResponse: {},
            },
            states: {
                idleLoginState: {
                    on: {
                        LOGIN: {
                            target: 'checkUserDetails',
                            actions: assign({
                                loginApiResponse: () => {
                                    return { statusCode: StatusCodes.processingCode }
                                }
                            })
                        }
                    },
                },
                checkUserDetails: {
                    invoke: {
                        id: 'verifyUserDetail',
                        src: (context, event) => verifyUserDetail(event.userDetails),
                        onDone: {
                            actions: ['assignLoginApiResponse', 'saveTokenToLocalStorage']
                        },
                        onError: {
                            target: '#loginState',
                            actions: 'assignLoginApiResponse'
                        }
                    }
                }
            }
            ,
            initial: 'idleLoginState'

        },
        {
            actions: {
                saveTokenToLocalStorage: (context, event) => {
                    localStorage.setItem('jwt_token', event.data.jwtToken);
                },
                assignLoginApiResponse: assign({
                    loginApiResponse: (context, event) => {
                        return event.data;
                    }
                }),
            }
        }
    )