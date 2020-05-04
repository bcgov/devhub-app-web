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
import cors from 'cors';
import healthcheckRouters from './routers/healthcheck';

dotenv.config();

// Config

const app = express();
// middlewares
app.use(bodyParser.json());


var corsOptions = {
   origin: `${process.env.CORS_URL}/contentContribution`,
   optionsSuccessStatus: 200
}

app.use(cors(corsOptions),function(req,res){
  req.on('data', chunk => {
   console.log(`${chunk}`)
 })
 req.on('end', () => {
   //end of data
 })

})

// routes
app.use('/v1/checks', healthcheckRouters);





export default app;