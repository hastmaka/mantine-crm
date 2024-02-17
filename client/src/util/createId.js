import PropTypes from "prop-types";

/**
 * Create an id with custom length
 * @param length - length for the created id
 * @returns {string}
 */
export const createId = (length) => {
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
};

createId.defaultValue = {
    length: 20
}

createId.propTypes = {
    length: PropTypes.number
}