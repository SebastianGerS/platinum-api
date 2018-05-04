/* eslint-disable global-require, no-console, guard-for-in, no-restricted-syntax */

if (!process.env.PG_DB) {
  const fs = require('fs');
  const dotenv = require('dotenv');
  const envConfig = dotenv.parse(fs.readFileSync('.env'));

  for (const k in envConfig) {
    process.env[k] = envConfig[k];
  }

  console.log('[api][sequelize] Loaded database ENV vars from .env file');
}

module.exports = {
  development: {
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    host: process.env.POSTGRES_HOST,
    dialect: 'postgres',
    migrationStorageTableName: 'sequelize_meta',
  },
  staging: {
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    host: process.env.POSTGRES_HOST,
    dialect: 'postgres',
    migrationStorageTableName: 'sequelize_meta',
  },
  production: {
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    host: process.env.POSTGRES_HOST,
    dialect: 'postgres',
    migrationStorageTableName: 'sequelize_meta',
  },
};

/* eslint-ensable global-require, no-console, guard-for-in, no-restricted-syntax */
