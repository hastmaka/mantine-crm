module.exports = function (sequelize, dataTypes) {
    const Model =  sequelize.define('test', {
        test_id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        test_author: dataTypes.STRING(255),
        test_email: dataTypes.STRING(255),
    }, {
        underscored: true,
        timestamps: false,
    });

    // Model.associate = function (models) {
    //     Model.hasMany(models.service, { foreignKey: 'client_client_id', onDelete: "NO ACTION", onUpdate: "NO ACTION" });
    // };

    return Model;
}