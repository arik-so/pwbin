import express = require('express');
import cookieParser = require('cookie-parser');
import logger = require('morgan');

import indexRouter from './routes';
import usersRouter from './routes/users';

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/users', usersRouter);

export default app;
