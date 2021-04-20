const app = require('./src/app');
const sequelize = require('./src/models');
const PORT = 8080;

async function assertDatabaseConnectionOk() {
	console.log(`Checking database connection...`);
	try {
		await sequelize.authenticate();
        await sequelize.sync()
		console.log('Database connection OK!');
	} catch (error) {
		console.log('Unable to connect to the database:');
		console.log(error.message);
		process.exit(1);
	}
}

async function init() {
	await assertDatabaseConnectionOk();

	console.log(`Starting server example on port ${PORT}...`);

	app.listen(PORT, () => {
		console.log(`Server started on port ${PORT}. Try some routes, such as '/api/users'.`);
	});
}

init();