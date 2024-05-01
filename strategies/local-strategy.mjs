import passport from 'passport';
import { Strategy } from 'passport-local';

passport.use(
  new Strategy({usernameField: 'email'}, (username, password, done) => {
    if (username === 'admin' && password === 'admin') {
      return done(null, { username: 'admin' });
    }
    return done(null, false);
  })
);
