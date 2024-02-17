import EzModel from "../model/EzModel.jsx";


export default class ClientModel extends EzModel {
    constructor(data) {
        super({
            fields: [{
                name: 'client_id', type: 'int'
            }, {
                name: 'client_name', type: 'string', editable: true
            }, {
                name: 'client_last_name', type: 'string', editable: true
            }, {
                name: 'client_email', type: 'string', editable: true
            }, {
                name: 'client_phone', type: 'phone', editable: true
            }, {
                name: 'created_at', type: 'date'
            }, {
                name: 'updated_at', type: 'date'
            }, {
                name: 'client_active', type: 'boolean'
            }],
            data
        });
    }
}
