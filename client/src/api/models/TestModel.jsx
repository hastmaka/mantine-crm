import EzModel from "../model/EzModel.jsx";


export default class TestModel extends EzModel {
    constructor(data) {
        super({
            fields: [{
                name: 'test_id', type: 'int'
            }, {
                name: 'test_author', type: 'string'
            }, {
                name: 'test_email', type: 'string'
            }],
            data
        });
    }
}