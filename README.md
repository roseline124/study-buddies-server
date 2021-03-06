# Study-Buddies-Server

"Education content sharing platform, Study Buddies"

This is `Study Buddies server`
You can play in our graphql playground! :)

```graphql
query {
  helloWorld
}
```

[![Run on Ainize](https://ainize-dev.herokuapp.com/images/run_on_ainize_button.svg)](https://master-study-buddies-server-angelhack-study-buddies.endpoint.dev.ainize.ai/graphql)

## Run

- build: `yarn build`
- run: `yarn dev`
- playground: `http://localhost:3000/graphql`
- lint: `yarn lint`

## Linting

- VScode extensions: `ESLint`, `Prettier - Code formatter`
- VScode setting: `formatOnSave: true`

## Environment Variables

- add `.env` file to project root
- add variables to `.env`

For example,

```
MY_NAME=STUDY_BUDDIES
```

- add variables to `config.ts` and use this

```
export const MY_NAME = process.env.MY_NAME
```

**env vars list**

- GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET: google oauth login
- local mysql db config ([run docker container](#connect-db))
  - MYSQL_DATABASE=studybuddies
  - MYSQL_USERNAME=root
  - MYSQL_PASSWORD=1234
  - MYSQL_HOST=127.0.0.1
  - MYSQL_PORT=9876
- SERVER_BASE_URL: server endpoint
- CLIENT_BASE_URL: need for redirecting to client
- NODE_ENV: development or production
- COOKIE_SECRET: for storing session

## Connect DB

Use local database until migrated.
Don't forget to sync your mysql setting and env vars in `config.ts`

1. start

- run docker-compose up -d
- sync the db and sequelize model: `yarn dev` (`sequelize.sync` in server.ts automatically creates tables to db)

2. end

- run docker-compose down

## docker run

- `yarn build`: first of all, check build is ok
- `docker build -t studybuddies .`: build docker image
- `docker run --publish 3000:3000 -d --name local studybuddies`: run docker container named `local`

### integration test

- create test db: `CREATE DATABASE studybuddies_test;`
- update `.env`: `MYSQL_DATABASE=studybuddies_test`
- run `yarn test`
