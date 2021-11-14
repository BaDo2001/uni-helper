# uni-helper
## An app to manage your university assignment schedule

# Live at https://glacial-stream-16288.herokuapp.com/

## Development

### Requirements
- Node.js - Available on https://nodejs.org/

### Setup

Install dependencies in  by using `npm run install:root` in the root folder.

Create `.env` file in the `uni-helper-backend` folder with the following content:

```
PORT=5000
MONGO_URI=<development mongodb url>
```

Contact the author to get access to the database.

### Run development servers

Run `npm start` in `root` folder. This will open the frontend on `localhost:3000` and the backend on `localhost:5000`.

## Deployment

The project has a Github action configured to deploy the master branch to Heroku.