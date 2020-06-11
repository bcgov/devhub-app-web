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
// authentication middleware

import { getJwtCertificate } from '@bcgov/common-nodejs-utils';
import passport from 'passport';
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';

import config from '../config/index.json';

export const verify = (req, jwtPayload, done) => {
  if (jwtPayload) {
    const user = {
      roles: jwtPayload.roles,
      name: jwtPayload.name,
      preferredUsername: jwtPayload.preferred_username,
      givenName: jwtPayload.given_name,
      familyName: jwtPayload.family_name,
      email: jwtPayload.email,
    };

    return done(null, user); // OK
  }

  const err = new Error('Unable to authenticate');
  err.code = 401;

  return done(err, false);
};

export const authmware = async (app) => {
  app.use(passport.initialize());
  app.use(passport.session());
  // We don't store any user information.
  passport.serializeUser((user, done) => {
    // eslint-disable-next-line
    console.log('serialize');
    done(null, {});
  });

  // We don't load any addtional user information.
  passport.deserializeUser((id, done) => {
    // eslint-disable-next-line
    console.log('deserialize');
    done(null, {});
  });

  const { certificate, algorithm } = await getJwtCertificate(config.sso.certsUrl);
  const opts = {};

  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  opts.algorithms = [algorithm];
  opts.secretOrKey = certificate;
  opts.passReqToCallback = true;
  // For development purposes only ignore the expiration
  // time of tokens.
  if (process.env.NODE_ENV === 'development') {
    opts.ignoreExpiration = true;
  }

  const jwtStrategy = new JwtStrategy(opts, verify);

  passport.use(jwtStrategy);
};
