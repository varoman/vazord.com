module.exports = {
	development: {
		username: 'postgres',
		password: 'vazordcom',
		database: 'vazord',
		host: '127.0.0.1',
		dialect: 'postgres',
	},
	heroku: {
		use_env_variable: 'DATABASE_URL',
		dialect: 'postgres',
		ssl:true,
		dialectOptions:{
			ssl:{
				require:true
			}
		}
	}
};

