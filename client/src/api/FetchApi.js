import {generalSignal} from "../signals/generalSignal.js";

export async function FetchApi(endpoint, method, data, query = {}, token = null) {
    let url = new URL('https://34.82.152.88:3000/api/' + endpoint);
    url.search = new URLSearchParams(query).toString();

    let options = {
        method: !method ? 'GET' : method?.toUpperCase(),
        headers: {
            'Content-Type': 'application/json',
        },
    };

    if(method) {
        options.body = JSON.stringify(data)
    }

    try {
        const response = await fetch(url, options);
        let resData = await response.json();
        
        if (resData.success) {
            return resData;
        } else {
            const {status, message} = resData
            if(status === 400 && message === 'Token is not valid') {
                return window.localStorage.clear()
            }
            console.log({ response, resData });
            return resData;
        }
    } catch (e) {debugger
        generalSignal.activeView = 'error'
        throw new Error(e);
    }
}











































