export const getDataReadyForDb = (data) => {
    let dataReady = {}

    Object.entries(data).map(([key, value]) => {
        if(['service_zip'].includes(key)){
            dataReady[key] = JSON.stringify(value)
        } else if(key === 'service_pet') {
            dataReady[key] = value === 'yes' ? 1 : 0
        } else if(key === 'client_phone') {
            dataReady[key] = value.replace (/\D/g, '')
        } else {
            dataReady[key] = value
        }
    })

    return dataReady
}
