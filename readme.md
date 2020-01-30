Tools needed:
1. NodeJS v.13 or higher
2. Latest NPM version
3. Docker and Docker Compose (not required, but recommended)

Steps to build backend:
1. Run `docker-compose up` (or `docker-compose up -d` for the detached process. It's recommended to at least run it without detach first to check if there are any errors in the containers for initialization) to initialize both PostgreSQL and Elasticsearch. They will be mapped to the ports 5432 and 9200 respectively. **Ensure both PostgreSQL and Elasticsearch are running and their data is written in `./data` because otherwise the data becomes volatile!** (If not using docker, you can install and run PostgreSQL and Elasticsearch manually too). Remember to copy `.env.example` to `.env` and change the user account as necessary to access PostgreSQL. (With docker-compose, the credentials are laid out for development).
2. Go to `backend`
3. `npm install` or `npm i`
4. Run `npm run build` followed by `npm run migrations:run` to create the PostgreSQL Database schema. (Ensure PostgreSQL is running).
5. Ensure both PostgreSQL and Elasticsearch are up and running, then run: `npm run es:reindex` to create mappings for the Elasticsearch indices.
6. `npm run start:dev` to start the backend code.
7. You can access it from http://localhost:4000/graphql to start with your GQL Queries. Look at `schema.graphql` on articles to see what queries and mutations are available and start fiddling!
