/**
 * deepSignal let you look up for a specific value no matter if is a primitive, object array, wherever, because this is something @preact/signals-react doesn't do
 */
import {deepSignal} from "deepsignal/react";
// import {updateLocalStore} from "../helper/updateLocalStore.js";
import {generalSignal} from "./generalSignal.js";
import {FetchApi} from "../api/FetchApi.js";
import {updateLocalStore} from "../util/index.js";
import SimpleCrypto from "simple-crypto-js"

export const loginSignal = deepSignal({
    loginMessage: {type: '', msg: ''},
    loadingBtn: false,
    active: 'signIn',

    user: {},

    setUser: async (user) => {
        let {token, ...rest} = user,
            secret = import.meta.env.VITE_REACT_APP_ENCRYPT_KEY,
            sC = new SimpleCrypto(secret)
        // debugger
        loginSignal.user = {...rest}
        generalSignal.activeView = 'dashboard'
        updateLocalStore('view', {activeView: 'dashboard'})
        updateLocalStore('user', user.user_uid)
        updateLocalStore('et', sC.encrypt(token))
    },

    handleChangeLogin: (value) => {
        loginSignal.active = value
        loginSignal.loginMessage = {type: '', msg: ''}
    },

    handleSubmit: (values) => {
        loginSignal.loadingBtn = true
        const loginMap = {
            signIn: () => {
                const apiKey = import.meta.env.VITE_REACT_APP_FIREBASE_API_KEY;
                const signInUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`;
                const requestData = {
                    email: values.email,
                    password: values.password,
                    returnSecureToken: true,
                }
                
                fetch(signInUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(requestData),
                }).then(response => {
                    if (!response.ok) {
                        loginSignal.loginMessage = {
                            ...loginSignal.loginMessage,
                            msg: 'Network Error. Please check your email.',
                            type: 'error'
                        }
                    }
                    return response.json();
                }).then(data => {
                    if (data?.error) {
                        loginSignal.loginMessage = {
                            ...loginSignal.loginMessage,
                            msg: 'User not found. Please check your email and password',
                            type: 'error'
                        }
                        loginSignal.loadingBtn = false
                    } else {
                        FetchApi(
                            'user/auth',
                            'POST',
                            {token: data.idToken}
                        ).then(res => {
                            if(res.success) {
                                loginSignal.setUser({...res.data, token: data.idToken})
                                loginSignal.loadingBtn = false
                            } else {
                                loginSignal.loginMessage = {
                                    ...loginSignal.loginMessage,
                                    msg: res.message,
                                    type: 'error'
                                }
                                loginSignal.loadingBtn = false
                            }
                        }).catch(err => {
                            generalSignal.activeView = 'error'
                        })
                    }
                }).catch(err => {
                    generalSignal.activeView = 'error'
                })
            },
            forgot: () => {debugger},
            create: () => {
                FetchApi(
                    'user/create',
                    'POST',
                    values
                ).then(user => {
                    if(user) {
                        loginSignal.user = {...loginSignal.user, ...user}
                        loginSignal.loginMessage = {
                            ...loginSignal.loginMessage,
                            msg: `User created Successfully`,
                            type: 'success'
                        }
                        loginSignal.active = 'signIn'
                        loginSignal.loadingBtn = false
                    } else {
                        loginSignal.loginMessage = {
                            ...loginSignal.loginMessage,
                            msg: `Something went wrong. Contact admin`,
                            type: 'error'
                        }
                        loginSignal.loadingBtn = false
                    }
                })
            },
        }
        loginMap[loginSignal.active]()
        loginSignal.formData = {}
    },

    handleSignOut: () => {
        localStorage.removeItem('user')
        window.location.reload()
    }
})

/**
 * same as useEffect subscribe to a specific value and trigger every time this change
 */
loginSignal.$loginMessage.subscribe(() => {
    if(loginSignal?.loginMessage.msg) {
        const reset = setTimeout(() => {
            loginSignal.loginMessage = {type: '', msg: ''}
        }, 4000)
        return () => clearTimeout(reset)
    }
})
