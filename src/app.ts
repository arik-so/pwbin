import express = require('express');
import cookieParser = require('cookie-parser');
import logger = require('morgan');

import indexRouter from './routes';
import * as path from 'path';

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

// static file setup
app.use('/public/js/pwbin.js', express.static(path.join(__dirname, 'client/bin/pwbin.js')));

// view engine setup
app.set('views', path.join(__dirname, 'client/views'));
app.set('view engine', 'pug');

app.use('/', indexRouter);

export default app;
