import PropTypes from "prop-types";

const setStore = (key, data) => localStorage.setItem(key, JSON.stringify(data))

export const updateLocalStore = (key, data) => {
    if (JSON.parse(localStorage.getItem(key)) === null) {
        localStorage.setItem(key, JSON.stringify({}))
    }

    const useCase = {
        view: () => setStore(key, data),
    }

    if(useCase[key] && typeof useCase[key] === 'function') {
        useCase[key]()
    } else {
        setStore(key, data)
    }
};

export const getFromLocalStore = (key) => {
    return JSON.parse(localStorage.getItem(key))
}

updateLocalStore.prototype = {
    key: PropTypes.string.isRequired,
    data: PropTypes.object.isRequired
}
