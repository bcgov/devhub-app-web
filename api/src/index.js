/*
Copyright 2020 Province of British Columbia

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at 

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

Created by Patrick Simonian
*/
'use strict';

import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import express from 'express';
import passport from 'passport';
import healthcheckRouters from './routers/healthcheck';
import { authmware } from './utils/authmware';
import topicRouters from './routers/topics';
import cors from 'cors';
import { originMatchesPattern } from './utils/cors';

dotenv.config();

const app = express();

// default to devhub in localhost
const corsOrigin = process.env.CORS_ORIGIN || 'http://localhost:8000';
const corsPattern = process.env.CORS_PATTERN || '';

/**
 * the dynamic cors origin checker
 * does it match a specific origin or a pattern
 * @param {String} origin
 * @param {Fn} callback
 */
export const originIsWhitelisted = (origin, callback) => {
  if (
    !origin ||
    origin === corsOrigin ||
    (corsPattern && originMatchesPattern(corsPattern, origin))
  ) {
    //eslint-disable-next-line
    console.log('ORIGIN', origin);
    return callback(null, true);
  }

  return callback(new Error('Not Allowed by CORS'));
};

// middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// routes
app.use('/v1/checks', healthcheckRouters);

app.use(cors({ origin: originIsWhitelisted }));

// authenticated routes

authmware(app);
// app.use(passport.authenticate('jwt', { session: false }));
// app.options('/v1/topics', (req, res) => {

// })
app.use('/v1/topics', topicRouters);

export default app;
