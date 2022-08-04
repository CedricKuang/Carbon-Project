const express = require("express");
const path = require("path");
const logger = require("morgan")
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dotenv = require("dotenv");

const webpack = require("webpack");

const sessions = require("./routes/session");
const auth = require("./routes/auth");
const api = require("./routes/api/index");

const router = require("./routes");
const { isAuthenticated } = require("./controllers/adminController");

const webpackDevMiddleware = require("webpack-dev-middleware");
const webpackConfig = require("../webpack.dev.js");
const compiler = webpack(webpackConfig);

dotenv.config();

// SERVER
const app = express();




/**
 * Middlewares
 */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.SESSION_SECRET));
app.use(cors({
  credentials: true,
  origin: true
}));
app.use(logger('dev'));

// sessions consists of a middleware used to initialize the passport authentication,
// the express-session middleware, passport with session, as well as the
// passport Google authentication.
app.use(sessions);

// after configuring both passport and session, this middleware basically
// requires people to login before they can access all the functionalities
// of carbon.
app.use(auth);

// API routing
app.use('/api', api);

// Static assets such as login.css
// and index.bundle.js (the React app)
app.use(express.static("./login"));

app.get('/login', (req, res) => {
  res.sendFile(path.resolve(__dirname, "./login/login.html"))
});

// Requires user to be authenticated before accessing
// all parts of the website
app.use(isAuthenticated);





/**
 * Express serving our React frontend
 */
app.use(express.static("../public"));

if (process.env.NODE_ENV !== "production") {
  app.use(
    webpackDevMiddleware(compiler, {
      noInfo: true,
      publicPath: webpackConfig.output.publicPath
    })
  );

  app.use(require("webpack-hot-middleware")(compiler));
}

// This loads both the HTML file that renders
// the actual React app and the login HTML file
// We MUST place it last or else when the browser
// makes a request to /login.css or /index.bundle.js
// it will get swallowed up by the React app instead
// of the server
app.get('/*', (req, res) => {
  res.sendFile(path.resolve(__dirname, "../public/index.html"))
});




const PORT = parseInt(process.env.PORT, 10) || 3000;
app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));
