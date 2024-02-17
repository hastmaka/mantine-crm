module.exports = function (sequelize, dataTypes) {
    const Model =  sequelize.define('service', {
        service_id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        service_type: dataTypes.STRING(25),
        service_status: dataTypes.STRING(25),
        service_bath: dataTypes.STRING(25),
        service_bed: dataTypes.STRING(25),
        service_zip: dataTypes.TEXT,
        //rent
        service_pet: dataTypes.BOOLEAN,
        service_active: dataTypes.BOOLEAN,
        service_price_from: dataTypes.STRING(25),
        service_price_to: dataTypes.STRING(25),
        //buy
        service_pre_approval: dataTypes.STRING(25),

        created_at: {
            type: 'TIMESTAMP',
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
            allowNull: false
        },
        updated_at: {
            type: 'TIMESTAMP',
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
            allowNull: false
        },
    }, {
        underscored: true,
        timestamps: false,
    });

    Model.associate = function (models) {
        Model.belongsTo(models.client, { foreignKey: 'client_client_id', onDelete: "NO ACTION", onUpdate: "NO ACTION" });
        Model.hasMany(models.document, { foreignKey: 'service_service_id', onDelete: "NO ACTION", onUpdate: "NO ACTION" });
        Model.hasMany(models.note, { foreignKey: 'service_service_id', onDelete: "NO ACTION", onUpdate: "NO ACTION" });
    };

    return Model;
}
