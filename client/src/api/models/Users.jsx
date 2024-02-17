import EzModel from "../model/EzModel.jsx";


export default class UserModel extends EzModel {
    constructor(data) {
        super({
            fields: [{
                name: 'user_id', type: 'int'
            }, {
                name: 'user_active', type: 'boolean'
            }, {
                name: 'user_email', type: 'string'
            }],
            data
        });
    }
}