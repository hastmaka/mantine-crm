import PropTypes from "prop-types";

export const capitalizeFirstLetter = (str, capitalizeAll = false) => {
    if(str) {
        // Convert the entire string to uppercase if capitalizeAll is true
        if (capitalizeAll) {
            return str.toUpperCase();
        }

        // Split the string by underscores and capitalize the first letter of each word
        const capitalizedWords = str.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1));

        // Join the words back together with spaces
        return capitalizedWords.join(' ');
    } return ''
}

capitalizeFirstLetter.prototype = {
    str: PropTypes.string.isRequired
}
