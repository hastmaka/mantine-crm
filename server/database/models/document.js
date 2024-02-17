module.exports = function (sequelize, dataTypes) {
    const Model =  sequelize.define('document', {
        document_id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        document_data: dataTypes.TEXT('long'),
        document_active: dataTypes.BOOLEAN,

        created_at: {
            type: 'TIMESTAMP',
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
            allowNull: false
        },
        updated_at: {
            type: 'TIMESTAMP',
        },
    }, {
        underscored: true,
        timestamps: false,
    });

    Model.associate = function (models) {
        Model.belongsTo(models.service, { foreignKey: 'service_service_id', onDelete: "NO ACTION", onUpdate: "NO ACTION" });
    };

    return Model;
}
