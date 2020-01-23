const process = require('process');

module.exports = {
    type: process.env.DATABASE_TYPE,
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_DATABASE,

    synchronize: false,
    logging: true,
    dirname: [
        `${__dirname}/src/domain/**/entities/*.entity.ts`,
        `${__dirname}/dist/domain/**/entities/*.entity.js`,
    ],
    migrations: [`dist/migrations/*.js`],
    cli: {
        entitiesDir: 'src',
        migrationsDir: 'src/migrations',
    },
};
