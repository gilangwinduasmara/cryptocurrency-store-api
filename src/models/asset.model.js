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
			allowNull: false,
			type: DataTypes.STRING,
		},
		type_is_crypto: {
			allowNull: false,
			type: DataTypes.INTEGER,
		},
		data_start: {
			allowNull: false,
			type: DataTypes.DATEONLY,
		},
		data_end: {
			allowNull: false,
			type: DataTypes.DATEONLY,
		},
		data_quote_start: {
			allowNull: false,
			type: DataTypes.DATE,
		},
		data_quote_end: {
			allowNull: false,
			type: DataTypes.DATE,
		},
		data_orderbook_start: {
			allowNull: false,
			type: DataTypes.DATE,
		},
		data_orderbook_end: {
			allowNull: false,
			type: DataTypes.DATE,
		},
		data_trade_start: {
			allowNull: false,
			type: DataTypes.DATE,
		},
		data_trade_end: {
			allowNull: false,
			type: DataTypes.DATE,
		},
		data_symbols_count: {
			allowNull: false,
			type: DataTypes.INTEGER,
		},
		volume_1hrs_usd: {
			allowNull: false,
			type: DataTypes.DOUBLE,
		},
		volume_1day_usd: {
			allowNull: false,
			type: DataTypes.DOUBLE,
		},
		volume_1mth_usd: {
			allowNull: false,
			type: DataTypes.DOUBLE,
		},
		price_usd: {
			allowNull: false,
			type: DataTypes.DOUBLE,
		},
		id_icon: {
			type: DataTypes.STRING,
		},
	});
};