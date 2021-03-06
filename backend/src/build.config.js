/**
 * @file Defines all constants required for application configuration.
 * @author Valer Varga
 */

const config = {
  PORT: process.env.PORT || 3000,
	DATABSE_URL: 'mongodb://localhost/store',
	SALT_ROUNDS: 10,
	SECRET_KEY: 'strong-secret-key'
};

module.exports = config;
