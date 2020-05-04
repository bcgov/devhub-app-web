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
import cors from 'cors';
import healthcheckRouters from './routers/healthcheck';
<<<<<<< HEAD
import { authmware } from './utils/authmware';
=======
import topicRouters from './routers/topics';
>>>>>>> Add topic routes

dotenv.config();

// Config

const app = express();
// middlewares
app.use(bodyParser.json());

// default to devhub in localhost
const corsOrigin = process.env.CORS_URL || 'http://localhost:8000';

var corsOptions = {
   origin: corsOrigin,
   optionsSuccessStatus: 200
}

app.use(cors(corsOptions));

// routes
app.use('/v1/checks', healthcheckRouters);


// authenticated routes 

authmware(app);
app.use(passport.authenticate('jwt', { session: false }));
app.use('/v1/topics', topicRouters);


export default app;