const { DataTypes } = require('sequelize');

// We export a function that defines the model.
// This function will automatically receive as parameter the Sequelize connection object.
module.exports = (sequelize) => {
	sequelize.define('asset', {
		// The following specification of the 'id' attribute could be omitted
		// since it is the default.
		asset_id: {
			allowNull: false,
			primaryKey: true,
			type: DataTypes.STRING
		},
		name: {
			type: DataTypes.STRING,
		},
		type_is_crypto: {
			type: DataTypes.INTEGER,
		},
		data_start: {
			type: DataTypes.DATEONLY,
		},
		data_end: {
			type: DataTypes.DATEONLY,
		},
		data_quote_start: {
			type: DataTypes.DATE,
		},
		data_quote_end: {
			type: DataTypes.DATE,
		},
		data_orderbook_start: {
			type: DataTypes.DATE,
		},
		data_orderbook_end: {
			type: DataTypes.DATE,
		},
		data_trade_start: {
			type: DataTypes.DATE,
		},
		data_trade_end: {
			type: DataTypes.DATE,
		},
		data_symbols_count: {
			type: DataTypes.INTEGER,
		},
		volume_1hrs_usd: {
			type: DataTypes.DOUBLE,
		},
		volume_1day_usd: {
			type: DataTypes.DOUBLE,
		},
		volume_1mth_usd: {
			type: DataTypes.DOUBLE,
		},
		price_usd: {
			type: DataTypes.DOUBLE,
		},
		id_icon: {
			type: DataTypes.STRING,
		},
	});
};