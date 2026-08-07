const express = require('express');

const app = express();

const db = require('./util/database');
const tables = require('./database/tables');

app.use(tables);

app.listen(4000);