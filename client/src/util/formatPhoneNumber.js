export const formatPhoneNumber = (value) => {
    // Remove all non-digit characters from the phone number
    let cleaned = ('' + value).replace(/\D/g, ''),

    // Format the phone number as (xxx)-xxx-xxxx
        formattedPhoneNumber = cleaned.length ? '(' : ''
        for (let i in cleaned) {
            if (i < 10) {
                formattedPhoneNumber += cleaned[i];
            }
            if (parseInt(i) === 2) {
                if (cleaned.length - 1 > i) {
                    formattedPhoneNumber += ') '
                }
            }
            if (parseInt(i) === 5) {
                if (cleaned.length - 1 > i) {
                    formattedPhoneNumber += '-'
                }
            }
        }
    return formattedPhoneNumber;
}