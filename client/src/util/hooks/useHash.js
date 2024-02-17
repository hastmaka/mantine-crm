import PropTypes from "prop-types";
import {updateLocalStore} from "../updateLocalStore.js";

export default function useHash({activeView}) {
    updateLocalStore('view', {activeView})
    window.location.hash = activeView
}

useHash.propTypes = {
    reference: PropTypes.string.isRequired,
    activeView: PropTypes.number.isRequired
}