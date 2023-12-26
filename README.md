
## Description
This is an api code challenge project for Outfit7 called Events7 written in [Nest](https://github.com/nestjs/nest) framework. It provides crud endpoints to define client events.

### Features
- Crud endpoints for events
- Pagination sorting and filtering of events
- Event type validation
- Ip auth check endpoint

### Assumptions
- Code challenge instructions dictate that only some users can create **ads type** events based on their country. If so any user can still edit and delete any events potentially editing events which they cant create. Therefore, users can only edit delete and create **ads type** events if they are authorized to do so.
- I assumed that you would prefer already written .env files for convenience and because it is a code challenge project even though it is a bad practice to do so.
- Since this project would need to be hosted online to get user ip I mock ip if environment is development and request is coming from localhost.

## Development setup

### 1. Install npm dependencies
```bash
$ npm install
```
### 2. Setup postgres database
Use prepared docker-compose.dev.yml and .env.dev to create postgres database in docker container.
```bash
$ docker-compose --env-file=.env.dev -f docker-compose.dev.yml up --build
```
_Alternatively you can setup postgres database on your machine and edit .env.dev appropriately._
### 3. Run migrations
```bash
$ npm run typeorm:migrate
```
### 4. Run application
```bash
$ npm run start:dev
```
or
```bash
$ npm run start:debug
```

## Production setup
See environmental variables .env and adjust appropriately
```bash
$ docker-compose up --build
```

## Changing environment
```bash
$ docker-compose down
```
Then proceed with environment setup

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

