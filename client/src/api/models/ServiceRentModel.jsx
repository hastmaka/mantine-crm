import EzModel from "../model/EzModel.jsx";


export default class ServiceRentModel extends EzModel {
    constructor(data) {
        super({
            fields: [{
                name: 'client_client_id', type: 'int'
            }, {
                name: 'service_id', type: 'int'
            }, {
                name: 'service_bath', type: 'string', editable: true
            }, {
                name: 'service_bed', type: 'string', editable: true
            }, {
                name: 'service_zip', type: 'json', editable: true
            }, {
                name: 'service_document', type: 'json'
            }, {
                name: 'service_note', type: 'json'
            }, {
                name: 'service_price_from', type: 'string', editable: true
            }, {
                name: 'service_price_to', type: 'string', editable: true
            }, {
                name: 'service_pet', type: 'boolean', editable: true,
                render: (value) => {
                    return value ? 'yes' : 'no'
                }
            }, {
                name: 'service_status', type: 'string'
            }, {
                name: 'service_type', type: 'string'
            }, {
                name: 'created_at', type: 'date'
            }, {
                name: 'updated_at', type: 'date'
            }],
            data
        });
    }
}
