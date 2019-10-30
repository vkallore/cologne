# Cologne Shipping Tool

## Project Setup

### .env

```env
SERVER_PORT=SERVER_PORT
PORT=FRONTEND_PORT
JWT_SECRET=YOUR_JWT_SECRET
REACT_APP_NODE_PATH=src/
```

### Note

* If `PORT` is not mentioned, default port will be used.
* The `REACT_APP_NODE_PATH` helps to include components with absolute path.

## Run the app

```bash
yarn start
# OR
npm start
```

Runs the app in the development mode.

Open [http://localhost:3000](http://localhost:3000) to view it in the browser (unless `PORT` is changed in [`.env`](#env)).

The server will run on the port mentioned `SERVER_PORT` on localhost.
