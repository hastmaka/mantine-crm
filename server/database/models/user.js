module.exports = function (sequelize, dataTypes) {
    return sequelize.define ('user', {
        user_id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        user_name: dataTypes.STRING (25),
        user_last_name: dataTypes.STRING (25),
        user_email: dataTypes.STRING (25),
        user_active: dataTypes.BOOLEAN,
        user_uid: dataTypes.STRING(50),
        created_at: {
            type: 'TIMESTAMP',
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
            allowNull: false
        },
    }, {
        underscored: true,
        timestamps: false,
    });
}