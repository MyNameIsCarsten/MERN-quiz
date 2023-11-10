const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const bcrypt = require("bcrypt");
const connectToDatabase = require("../server/routes/db/conn.js");
require("../server/routes/loadEnvironment.js");
const { ObjectId } = require('mongodb');

const session = require('express-session')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy


app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
  origin: ['http://localhost:3000', 'https://quizify-mern-app.netlify.app'], // Replace with your allowed origins
  methods: '*',
  credentials: true, // Allow credentials (cookies, sessions) to be sent in the request
}));
app.use(morgan('dev'));
app.options('*', cors());

//--------------- Middleware ----------------//
// generate unique session / Session Config
app.use(
  session({
    // key used for signing and/or encrypting cookies in order to protect our session ID
    // random string should be stored securely in an environment variable, not in the code
    secret: "f4z4gs$Gcg",
    // cookie that stores the session ID
    cookie: {
      maxAge: 300000000,
      secure: process.env.NODE_ENV === 'production', // Set to true in production
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax', // Adjust based on your needs
    },
    // if true, server will store every new session, even if there are no changes to the session object
    saveUninitialized: true,
    // if true, force a session to be saved back to the session data store, even when no data was modified
    resave: false,
  })
);

// Passport Config //
// Initialize the passport library
app.use(passport.initialize());

// Implement a session with passport below /  include the session with passport
app.use(passport.session());


// set up Passport’s local strategy / passport config
passport.use(new LocalStrategy(
  async (username, password, done) => {
    // console.log("\n===========LocalStrategy===================\n")
    // console.log(`Value of "User" in LocalStrategy function ----> ${username}`)         //passport will populate, user = req.body.username
    // console.log(`Value of "Password" in LocalStrategy function ----> ${password}`) //passport will popuplate, password = req.body.password
    try {
      // Connect to the MongoDB database
      const db = await connectToDatabase();
      const usersCollection = db.collection('users');

      // Find the user by username
      const user = await usersCollection.findOne({ username: username });

      // close connection to the database
      db.client.close();

      if (!user) {
        // If user not found, return null and false in the callback
        return done(null, false);
      }

      // Use bcrypt to hash the provided password
      const saltRounds = 10;
      const salt = await bcrypt.genSalt(saltRounds);
      bcrypt.hash(password, salt, async (err, hashedPassword) => {
        if (err) {
          return done(err);
        }

        // Log the hashed password
        // console.log('Hashed password: ', hashedPassword);

        // Check if the hashed password matches the stored hashed password
        const passwordMatches = await bcrypt.compare(password, user.password);

        if (!passwordMatches) {
          // If user found but the password is not valid, return null and false in the callback
          return done(null, false);
        }

        // If user found and password is valid, return the user object in the callback
        return done(null, user);
      });
    } catch (err) {
      return done(err);
    }
  }
));

passport.serializeUser((user, done) => {
  // console.log("\n===========serializeUser===================\n")
  // console.log(user)
  // done(error object, value to be stored)
  done(null, user._id);
  // stores it internally on req.session.passport
});

passport.deserializeUser(async (_id, done) => {
  // console.log("---------> Deserialize Id")
  // console.log(_id)
  try {
    const db = await connectToDatabase();
    const usersCollection = db.collection('users');

    // Find the user by their unique identifier (typically ObjectId in MongoDB)
    const user = await usersCollection.findOne({ _id: new ObjectId(_id) });

    // close connection to database
    db.client.close();

    if (!user) {
      return done(null, false); // User not found
    }

    // If the user is found, return the user object
    return done(null, user);
  } catch (err) {
    return done(err);
  }
});

const printData = (req, res, next) => {
  console.log("\n===========GET/POST===================")
  // console.log(`------------>  ${count++}`)

  console.log(`req.method -------------- `) 
  console.log(req.method) 
  console.log(`---------------------------- `) 
  console.log(`req.body -------------- `) 
  console.log(req.body) 
  console.log(`---------------------------- `) 
  console.log(`req.body.username -------> ${req.body.username}`) 
  console.log(`req.body.password -------> ${req.body.password}`)

  console.log(`\n req.session.passport -------> `)
  console.log(req.session.passport)

  console.log(`\n req.user -------> `) 
  console.log(req.user) 

  console.log("\n Session and Cookie")
  console.log(`req.session.id -------> ${req.session.id}`) 
  console.log(`req.session.cookie -------> `) 
  console.log(req.session.cookie) 

  console.log("===========================================\n")

  next()
}

// app.use(printData)


const apiRouter = require('./routes/api');
app.use('/api', apiRouter);

app.get("/", (req, res) => {
  console.log('GET / req.isAuthenticated(): ', req.isAuthenticated())
  res.send(req.user)
})

app.get('/login', (req, res) => {
  res.json({
    isAuthenticated: req.isAuthenticated(),
    user: req.isAuthenticated() ? req.user : null,
  });
});

module.exports = app;
