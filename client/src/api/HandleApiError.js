import {generalSignal} from "../signals/generalSignal.js";

export default function HandleApiError({from, ...rest}) {
    // const errors = {
    //     //trying to re authenticate the user but for some reason failed
    //     'subscribeToAuthChanges': () => logoutUser(),
    //     'gettingUserReAuthentication': () => {
    //         generalSignal.showNotification({
    //             type: 'error',
    //             content: 'errors.gettingUserReAuthentication'
    //         })
    //         logoutUser()
    //     },
    //     //when try to sign in the user is in the auth db but not in firestore db
    //     'userIsNotInDb': () => {createLogOnDb({from, ...rest})},
    //
    //     'userNotFoundInAuth': () => {createLogOnDb({from, ...rest})},
    //
    //     'updateUserApi': () => {debugger},
    //
    //     'getByIdClientOffline': () => {createLogOnDb({from, ...rest})},
    //
    //     'getListings': () => {createLogOnDb({from, ...rest})}
    // }
    // errors[from]()
    // console.error('HandleApiError', from)
}
