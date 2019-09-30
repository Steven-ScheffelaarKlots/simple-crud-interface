# Simple Crud
This is a simple CRUD app that provides a React frontend with some express.js middleware to execute crud operations on a Postgres database

# Install

1. Install postgres for you desired operating system (This process can vary greatly depending on what OS you use so I won't explain it here)
2. Run `./makeDB.sh` in a terminal, this will setup the postgres database for you
3. Run `cd api && npm install`, this will install the express.js middleware server
4. Run `cd ../client && npm install`, this will install the React fronted server
5. cd to the root directory and run `npm start --prefix client & npm start --prefix api &`, this will start the middleware server on localhost:3000 and the client server on localhost:3001
6. Navigate to http://localhost:3001 to see the client