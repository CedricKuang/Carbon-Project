const Router = require("express-promise-router");
const session = require("express-session");
const MongoDBStore = require('connect-mongodb-session')(session);
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;

const { User } = require('../db');
const callbackURL = process.env.NODE_ENV === "production" ? "https://carbon.dailybruin.com" : "http://localhost:3000";

const router = new Router();

const sessionStore = new MongoDBStore({
  uri: process.env.MONGO_URL + '/sessions',
	collection: 'session'
});


// secret : a secret key that will help encrypt all our info
router.use(
  session({
    store: sessionStore,
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
  })
);


// Initialize passport
router.use(passport.initialize());
// Initialize so that passport can work with our session on express-session
router.use(passport.session());


// Passport has many method of logging in (Facebook, Google, etc)
// This is the command that we use to configure passport logging in
// with google authentication.
passport.use(new GoogleStrategy({
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: `${callbackURL}/auth/google/callback`,
  passReqToCallback: true
}, async (request, accessToken, refreshToken, profile, done) => {
  // This is the ID that the user has from Slack
  // console.log(profile);
  const reqGoogleId = profile.id;
  await User.findOne({ 'google.id': reqGoogleId }, (err, user) => {

    // Error handling
    if (err) {
      done(err);
    }

    // User already exist, we can continue
    if (user) {
      done(null, user);
    } else {
      // User does not exist, let's store it in our Database!

      // console.log("User " + reqGoogleId + " does not exist in Carbon. Creating...");
      let newUser = new User();

      newUser.email = profile.email;
      newUser.google.id = reqGoogleId;
      console.log(newUser);

      // This is to be smart about google names
      // They won't always be set in a certain way
      // So we avoid undefined errors by using empty string
      newUser.firstName = profile.givenName;
      newUser.lastName = profile.familyName;

      // This line actually creates the user we've built up
      // in the database
      newUser.save((err) => {
        if (err) {
          console.log("Could not save user");
          console.log(err);
          throw err;
        }
        done(null, newUser);
      });
    }
  });
  }
));

// serializeUser basically sets the user id as a cookie
// in the browser
passport.serializeUser((user, done) => {
  done(null, user['_id']);
});

// deserializeUser gets the id form the cookie and then
// in this particular case, finds the user with that id and returns
// all the user's information.
// the user's information is then stored in the req object as req.user
passport.deserializeUser(async (localId, done) => {
  try {
    done(null, await User.findById(localId));
  } catch (e) {
    done(e, null);
  }
});

module.exports = router