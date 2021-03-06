const { Sequelize } = require('sequelize');

// In a real app, you should keep the database connection URL as an environment variable.
// But for this example, we will just use a local SQLite database.
// const sequelize = new Sequelize(process.env.DB_CONNECTION_URL);
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql'
});

const modelDefiners = [
	require('./user.model'),
	require('./asset.model'),
	require('./transaction.model'),
	// require('./models/instrument.model'),
	// require('./models/orchestra.model'),
	// Add more models here...
	// require('./models/item'),
];

// We define all models according to their files.
for (const modelDefiner of modelDefiners) {
	modelDefiner(sequelize);
}

// We execute any extra setup after the models are defined, such as adding associations.
const { user, asset, transaction } = sequelize.models;

transaction.hasOne(asset, {as: 'asset', sourceKey: 'asset_id', foreignKey: 'asset_id'});

// We export the sequelize connection instance to be used around our app.
module.exports = sequelize;