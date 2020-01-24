const es = require('@elastic/elasticsearch');
const dotenv = require('dotenv');
const pg = require('pg');

const article = require('./article');

dotenv.config();
const config = process.env;
const esNode = config.ES_NODE;
const esClient = new es.Client({ node: esNode });
const dbClient = new pg.Client({
    host: config.DATABASE_HOST,
    port: config.DATABASE_PORT,
    user: config.DATABASE_USERNAME,
    password: config.DATABASE_PASSWORD,
    database: config.DATABASE_DATABASE,
});

// Cleanup ES by force.
async function cleanES() {
    console.log('Cleaning ES Indexes.');
    console.log('======================================');

    console.log('Deleting articles index.');
    let exists = await esClient.indices.exists({ index: 'articles' });
    if (exists.body) {
        await esClient.indices.delete({ index: 'articles' });
    }

    console.log();
}

// Recreate Index

async function createES() {
    console.log('Create mapping properties for objects.');
    console.log('======================================');

    console.log('Creating index for articles.');
    await esClient.indices.create(article.settings);
    console.log('Creating mappings for articles.');
    await esClient.indices.putMapping(article.mappings);

    console.log();
}

// Sync with database
async function syncDatabase() {
    console.log('Synchronizing ES with Database Data.');
    console.log('======================================');

    console.log('Connecting to the database.');
    await dbClient.connect();

    console.log('Syncing data for articles.');
    const res = await dbClient.query('SELECT * FROM articles;');
    
    res.rows.forEach(async (row) => {
        await esClient.index({
            index: 'articles',
            body: {
                author: row.author,
                document: row.document,
                createdAt: row.created_at,
                updatedAt: row.updated_at,
                titleCompletion: row.title.split(/\s+/),
                title: row.title,
                id: row.id,
            },
        });
    });

    await dbClient.end();
    console.log();
}

// Reindex to make sure the data is refreshed
async function reindexAll() {
    console.log('Refreshing indices to ensure data is commited.');
    console.log('======================================');

    console.log('Refreshing articles index...');
    await esClient.indices.refresh({ index: 'articles' });

    console.log();
}

async function doReindex() {
    await cleanES();
    await createES();
    await syncDatabase();
    await reindexAll();
}

doReindex().then(() => {
    console.log('Done.');
    return process.exit(0);
}, (err) => console.trace(err.message));
