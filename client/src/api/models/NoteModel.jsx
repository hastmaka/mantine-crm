import EzModel from "../model/EzModel.jsx";


export default class NoteModel extends EzModel {
    constructor(data) {
        super({
            fields: [{
                name: 'note_id', type: 'int'
            }, {
                name: 'note_content', type: 'string', editable: true
            }, {
                name: 'note_who', type: 'string', editable: true
            }, {
                name: 'note_severity', type: 'string', editable: true
            }, {
                name: 'note_active', type: 'boolean'
            }, {
                name: 'created_at', type: 'longDate'
            }, {
                name: 'updated_at', type: 'longDate'
            }],
            data
        });
    }
}
