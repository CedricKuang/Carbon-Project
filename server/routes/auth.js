const Router = require("express-promise-router");
const passport = require('passport');

const router = new Router();

const callbackURL = process.env.NODE_ENV === "production" ? "https://carbon.dailybruin.com" : "http://localhost:3000";


// GET /auth/google
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in Google authentication will involve redirecting
//   the user to google.com.  After authorization, Google will redirect the user
//   back to this application at /auth/google/callback
router.get('/auth/google', passport.authenticate('google', {
  scope: [ 'email', 'profile' ] 
}));


// GET /auth/google/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
router.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    req.session.save(() => {
      res.redirect('/')
    })
  }
);

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect(callbackURL);
});

module.exports = router