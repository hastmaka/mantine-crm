module.exports = function (sequelize, dataTypes) {
    const Model =  sequelize.define('note', {
        note_id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        note_content: dataTypes.TEXT,
        note_who: dataTypes.STRING(50),
        note_severity: dataTypes.STRING(25),
        note_active: dataTypes.BOOLEAN,

        created_at: {
            type: dataTypes.DATE,
            defaultValue: dataTypes.NOW
        },
        updated_at: {
            type: dataTypes.DATE,
            defaultValue: dataTypes.NOW
        },
    }, {
        underscored: true,
        timestamps: false,
        hooks: {
            afterCreate:(instances, options) => {
                // debugger
            },

            afterUpdate(attributes, options) {
                return attributes
            }
        }
    });

    Model.associate = function (models) {
        Model.belongsTo(models.service, { foreignKey: 'service_service_id', onDelete: "NO ACTION", onUpdate: "NO ACTION" });
    };

    return Model;
}
