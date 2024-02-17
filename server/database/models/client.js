module.exports = function (sequelize, dataTypes) {
    const Model =  sequelize.define('client', {
        client_id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        client_name: dataTypes.STRING(25),
        client_last_name: dataTypes.STRING(25),
        client_email: dataTypes.STRING(25),
        client_phone: dataTypes.STRING(25),
        client_active: dataTypes.BOOLEAN,
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
        Model.hasMany(models.service, { foreignKey: 'client_client_id', onDelete: "NO ACTION", onUpdate: "NO ACTION" });
    };

    return Model;
}