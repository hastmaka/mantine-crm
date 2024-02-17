import {deepSignal} from "deepsignal/react";
import {AppController} from "./AppController.jsx";
import {getFromLocalStore} from "../util/index.js";

//here we are going to check who the user is, if is logged in, and permissions
AppController()

export const generalSignal = deepSignal({
    screen: '',
    activeView: getFromLocalStore('view').activeView,
    burger: {
        toggle: false
    },
    modal: [],//{open: false,who: '',sx: {},close: null}
    toast: {
        open: false,
        type: 'error',
        title: '',
        content: '',
        timeout: 0
    },
    confirm: {
        open: false,
        content: '',
    },

    setScreen(value) {
        generalSignal.screen = value
    },

    toggleBurger: () => generalSignal.burger.toggle = !generalSignal.burger.toggle,

    setView: (view) => {
        generalSignal.activeView = view
    },

    openModal(props) {
        generalSignal.modal = [...generalSignal.modal, {...props, open: true}]
    },
    closeModal(modal) {
        // generalSignal.modal = generalSignal.modal.slice(0, -1)
        // formReducerSignal.isFormReady = formReducerSignal.isFormReady.filter(i => i !== modal)
    },
    showToast(payload) {
        generalSignal.toast = {
            ...generalSignal.toast,
            open: true,
            timeout: payload.important ? 10000 : 3000,
            ...payload
        }
    },
    closeToast() {
        generalSignal.toast = {
            ...generalSignal.toast,
            open: false
        }
    },
    showConfirm(payload) {
        generalSignal.confirm = {
            ...generalSignal.confirm,
            open: true,
            content: payload
        }
    },
    closeConfirm() {
        generalSignal.confirm = {
            ...generalSignal.confirm,
            open: false
        }
    }
})


// effect(() => {
//     console.log(generalSignal.scrollPosition.modal)
// })
