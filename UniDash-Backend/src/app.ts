import express, { Application } from 'express';
import * as dotenv from 'dotenv';
import { exit } from 'process';
import cors from 'cors';
import bodyParser from 'body-parser';

const app: Application = express();
// import db from './_helpers/database';
dotenv.config();
const port = process.env.PORT || 3030;

// Our error handler
const errorHandler = require('./_helpers/error-handler');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// app.use(jwt());
app.use('/user', require('./routes/user.router'));
app.use('/group', require('./routes/group.router'));

app.use(errorHandler);

process.on('SIGINT', () => { console.log("Bye bye!"); process.exit(); });
process.on('uncaughtException', function(ex) {
  console.log(ex);
  
  exit(-1)
})

// start server
app.listen(port, function () {
  console.log('Server listening on port ' + port);
});
