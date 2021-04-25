const { DataTypes } = require('sequelize');

// We export a function that defines the model.
// This function will automatically receive as parameter the Sequelize connection object.
module.exports = (sequelize) => {
	sequelize.define('transaction', {
		// The following specification of the 'id' attribute could be omitted
		// since it is the default.
		id: {
			allowNull: false,
			primaryKey: true,
			type: DataTypes.STRING
		},
		user_id: {
			allowNull: false,
            type: DataTypes.INTEGER
		},
		asset_id: {
			allowNull: false,
            type: DataTypes.INTEGER
		},
        price_usd: {
			type: DataTypes.DOUBLE,
		},
        status: {
            type: DataTypes.STRING
        },
        ammount: {
            type: DataTypes.DOUBLE
        }
	});
};