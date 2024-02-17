import {getFromLocalStore, updateLocalStore} from "../util/index.js";
import {FetchApi} from "../api/FetchApi.js";
import SimpleCrypto from "simple-crypto-js"
import {loginSignal} from "./loginSignal.js";
import {generalSignal} from "./generalSignal.js";


const verifySession = () => {
    let a;
    try {
        a = JSON.parse(localStorage.getItem('user'))
    }catch (e) {
        window.localStorage.clear()
        a = false
    }
    return a
}

export const AppController = async () => {
    console.log('controller')
    let {hash} = window.location,
        reference = hash.split('#')[1];
        if(reference === 'login' ) {
            window.localStorage.clear()
            updateLocalStore('view', {activeView: 'login'})
        } else {
            if(!verifySession()) {
                updateLocalStore('view', {activeView: 'login'})
            } else {
                //re authenticate user
                let eT = getFromLocalStore('et'),
                    secret = import.meta.env.VITE_REACT_APP_ENCRYPT_KEY,
                    sC = new SimpleCrypto(secret),
                    token = sC.decrypt(eT)
                // debugger
                FetchApi('user/auth', 'POST', {token})
                    .then(res => {
                        let view = getFromLocalStore('view').activeView
                        if(res.success) {
                            if(view && view === 'error') {
                                view = 'dashboard'
                            }
                            loginSignal.user = {...res.data}
                            generalSignal.activeView = view || 'dashboard'
                        } else {
                            window.localStorage.clear()
                        }
                    })
            }
        }
}
