import {formatPhoneNumber} from "../../util/formatPhoneNumber.js";


const convertData = (value, type) => {
    let valueTypes = {
        int: (value) => {
            return parseInt(value);
        },
        boolean: (value) => {
            return !!value;
        },
        string: (value) => {
            return value.toString()
        },
        object: (value) => {
            return {...value}
        },
        array: (value) => {
            return [...value]
        },
        date: (value) => {
            const date = new Date(value);
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            const year = date.getFullYear();
            // const hours = date.getHours().toString().padStart(2, '0');
            // const minutes = date.getMinutes().toString().padStart(2, '0');
            // const seconds = date.getSeconds().toString().padStart(2, '0');

            return `${month}/${day}/${year}`;
            // return `${month}/${day}/${year} ${hours}:${minutes}:${seconds}`;
        },
        longDate: (value) => {
            const date = new Date(value);
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            const year = date.getFullYear();
            let hours = date.getHours();
            const minutes = date.getMinutes().toString().padStart(2, '0');
            const seconds = date.getSeconds().toString().padStart(2, '0');

            // Determine AM/PM indicator
            const ampm = hours >= 12 ? 'PM' : 'AM';

            // Convert 24-hour time to 12-hour format
            hours = hours % 12;
            hours = hours ? hours : 12; // 0 should be converted to 12 for AM/PM format

            // Construct the formatted date string
            const formattedTime = `${hours}:${minutes}:${seconds} ${ampm}`;
            return `${month}/${day}/${year} ${formattedTime}`;
        },

        json: (value) => {
            return JSON.parse(value)
        },
        phone: (value) => {
            return formatPhoneNumber(value)
        }
    }

    try {
        return valueTypes[type](value)
    } catch (error) {
        return null
    }
}

export default class EzModel {
    #fields;
    #data;
    constructor({fields, data}) {
        this.#fields = fields;
        this.#data = data;
        for (let {name, type, render} of fields) {
            this[name] = render? render(data[name]) : convertData( data[name], type)
        }
    }

    get(field) {
        return this[field];
    }

    set(field, value) {
        if (field !== undefined && field !== null && typeof field === 'object') {
            for (let [key, val] of Object.entries(field)) {
                if (Object.prototype.hasOwnProperty.call(field, key)) {
                    this[key] = val;
                }
            }
        } else {
            this[field] = value;
        }
    }


    editableFields(){
        let editableFields = {};
        for (let {editable, name, render, type, ...rest} of this.#fields) {
            if(editable) {
                editableFields[name] = render? render(this.#data[name]) : convertData( this.#data[name], type)
            }
        }
        return editableFields
    }
}
