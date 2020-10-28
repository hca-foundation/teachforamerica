# Teach for America Contact Portal - Frontend

## How to Run

- Set the appropriate environment variables in *.env* (see *env.sample*)
* `npm start` to start the server
* Navigate to http://localhost:3000

## Other Commands

* `npm test` to run the unit tests
* `npm run build` to create a static build
- `npm run format` to automatically format the project's code (see `.prettierrc.json`).

## SCSS Transpilation

Note `node-sass-chokidar` is used for building and watching `scss` files. It is
used in the above scripts. To call it manually, use `npm run build-css` or `npm run watch-css`.
