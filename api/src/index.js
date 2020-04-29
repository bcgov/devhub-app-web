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
import { logger } from '@bcgov/common-nodejs-utils';
import bodyParser from 'body-parser';
import express from 'express';

dotenv.config();

// Config

const app = express();

app.use(bodyParser.json());

app.get('/ehlo', (req, res) => {
  res.sendStatus(200);
});
// Error handleing middleware. This needs to be last in or it will
// not get called.
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  logger.error(err.message);
  const code = err.code ? err.code : 500;
  const message = err.message ? err.message : 'Internal Server Error';

  res.status(code).json({ error: message, success: false });
});


const port = process.env.PORT || 3000;
const host = process.env.HOST || '0.0.0.0';

app.listen(port, host, () => {
  logger.info(`Listening on ${host}:${port}`);
});
