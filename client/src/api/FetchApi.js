import {generalSignal} from "../signals/generalSignal.js";

export async function FetchApi(endpoint, method, data, query = {}, token = null) {
    let url = new URL(import.meta.env.VITE_API_URL + endpoint);
    // let url = new URL('https://35.185.226.28:443/api/' + endpoint);
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
    } catch (e) {
        generalSignal.activeView = 'error'
        throw new Error(e);
    }
}