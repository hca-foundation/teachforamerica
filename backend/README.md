# McNeilly Center Contact Portal - Backend

## How to Run

- Set the appropriate environment variables in _.env.local_ (see _env.local.sample_)
- `bin/docker npm install` to install the dependencies
- `bin/docker up -d` to start the server
- Navigate to http://localhost:3001
- If you have intellij, you can fire up the corresponding run configs

## Running your PostgreSQL Database Locally

A PostgreSQL container is provided via Docker Compose. You can run the backend service against it by setting `CONTACT_PORTAL_DATABASE_URL=postgres://postgres@localhost:5432/contact_portal`.

## Other Commands

- `bin/docker setup` - pulls down images, builds container, npm install, and runs migrations
- `bin/docker npm` - run npm in the context of the docker container
- `bin/docker sequelize` - sequelize command line
- `bin/docker test` - runs tests
- `bin/docker run` - run commands in the context of the dev container
- `bin/docker up -d` - runs the db and app container in the background
- `bin/docker logs -f dev` - dumps the console log for the app container to the terminal
- `bin/docker npm test` - runs unit tests
- `CONTACT_PORTAL_DATABASE_URL=INSERT_DATABASE_URL_HERE ./node_modules/sequelize-cli/lib/sequelize db:migrate` - Run database migrations.
- `CONTACT_PORTAL_DATABASE_URL=INSERT_DATABASE_URL_HERE ./node_modules/sequelize-cli/lib/sequelize db:migrate:undo` - Revert latest database migration.
- `npm run format` - Automatically format the project's code (see `.prettierrc.json`).
