require("./loadEnvironment.js");

const express = require('express');
const testApiRouter = express.Router();
const session = require("express-session");
const store = new session.MemoryStore();

const connectToDatabase = require("./db/conn.js");
const { ObjectId } = require('mongodb');

testApiRouter.use(express.json());
testApiRouter.use(express.urlencoded({ extended: false }));

const passport = require("passport");
// importing passport-local package with its Strategy instance
// to authenticate users with a username and passwor
const LocalStrategy = require("passport-local").Strategy;

// generate unique session
testApiRouter.use(
  session({
    // key used for signing and/or encrypting cookies in order to protect our session ID
    // random string should be stored securely in an environment variable, not in the code
    secret: "f4z4gs$Gcg",
    // cookie that stores the session ID
    cookie: { maxAge: 300000000, secure: false },
    // if true, server will store every new session, even if there are no changes to the session object
    saveUninitialized: false,
    // if true, force a session to be saved back to the session data store, even when no data was modified
    resave: false,
    store,
  })
);

const isLoggedIn = (req, res, next) => {
  if(!req.session.passport){
    res.redirect('/login')
  } else {
    next();
  }
};

testApiRouter.get(isLoggedIn);

// Add the middleware to initialize the passport library
testApiRouter.use(passport.initialize());

// Add the middleware to implement a session with passport below:
testApiRouter.use(passport.session());

passport.use(new LocalStrategy(
  async (username, password, done) => {
    try {
      // Connect to the MongoDB database
      const db = await connectToDatabase();
      const usersCollection = db.collection('users');

      // Find the user by username
      const user = await usersCollection.findOne({ username: username });

      // Close the database connection
      //client.close();

      if (!user) {
        // If user not found, return null and false in the callback
        return done(null, false);
      }

      // Check if the password is valid
      if (user.password !== password) {
        // If user found but the password is not valid, return null and false in the callback
        return done(null, false);
      }

      // If user found and password is valid, return the user object in the callback
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }
));

// Serializing a user determines which data of the user object should be stored in the session
// pass a user object and a callback function called done after successful authentication
passport.serializeUser((user, done) => {
  // done(error object, value to be stored)
  done(null, user._id);
  // stores it internally on req.session.passport
});

// user object can be retrieved from the session
// pass the key that was used when we initially serialized a user (id)
passport.deserializeUser(async (id, done) => {
  try {
    const db = await connectToDatabase();
    const usersCollection = db.collection('users');

    // Find the user by their unique identifier (typically ObjectId in MongoDB)
    const user = await usersCollection.findOne({ _id: ObjectId(id) });

    if (!user) {
      return done(null, false); // User not found
    }

    // If the user is found, return the user object
    return done(null, user);
  } catch (err) {
    return done(err);
  }
});

testApiRouter.post('/login', (req, res, next) => {
  console.log('req.body from POST to /login', req.body)
  // initiates the local authentication strategy
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({ message: 'Authentication failed' });
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      return res.status(200).json({ message: 'Authentication successful', user });
    });
  })(req, res, next);
});

testApiRouter.post(
  "/login",
  passport.authenticate("local", { failureRedirect: "/login" }),
  (req, res) => {
    res.redirect("/");
  }
);

const quiz = [
    {
    question: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
    answers: {
        1:{
            answer: 'Lorem ipsum',
            isCorrect: true
        },
        2:{
            answer: 'dolor sit amet',
            isCorrect: false
        },
        3:{
            answer: 'consetetur sadipscing elitr',
            isCorrect: false
        },
        4:{
            answer: 'sed diam nonumy',
            isCorrect: false
        },
    }
    },{
    question: 'Question 2',
    answers: {
        1:{
            answer: 'Hello World',
            isCorrect: true
        },
        2:{
            answer: 'Hello Universe',
            isCorrect: false
        },
        3:{
            answer: 'Hello City',
            isCorrect: false
        },
        4:{
            answer: 'Hello Country',
            isCorrect: false
        },
    }
    },
]

testApiRouter.param('id', (req, res, next, id) => {
    const questionId = Number(id);
    req.id = questionId;
    try {
        const foundQuestion = quiz[questionId]; 
    
        if (foundQuestion) {
          req.foundQuestion = foundQuestion; // Attach the found question to the request object
          next();
        } else {
          next(new Error('Question not found.'));
        }
      } catch (err) {
        next(err);
      }
    });

testApiRouter.get('/', async (req, res, next) => {
    console.log('req.session.passport: ', req.session.passport)
    const db = await connectToDatabase();
    let collection = await db.collection("users");
    let results = await collection.find({username: "carsten"})
      .limit(50)
      .toArray();
    console.log(results[0].username);

    res.send(quiz)
});


testApiRouter.delete('/quiz/:id', (req, res, next) => {
    if (req.id >= 0 && req.id < quiz.length) {
        // Check if the question ID is within the valid range
    
        const deletedQuestion = quiz.splice(req.id, 1);
    
        if (deletedQuestion.length === 1) {
          // Question successfully deleted
          res.status(200).json({ message: 'Question deleted successfully', deleted: deletedQuestion[0] });
        } else {
          // Question not found
          res.status(404).json({ message: 'Question not found' });
        }
      } else {
        // Invalid question ID
        res.status(400).json({ message: 'Invalid question ID' });
      }
    });


testApiRouter.post('/quiz/add', (req, res, next) => {
    const newQuestion = req.body;

    if(newQuestion){
        quiz.push(newQuestion);
        res.status(201).send(newQuestion);
    } else {
        res.status(400).send();
    }
});

testApiRouter.put('/quiz/edit/:id', (req, res, next) => {
    if (req.id >= 0 && req.id < quiz.length) {
        // Check if the question ID is within the valid range
        const editQuestion = quiz[req.id];

        if (editQuestion) {
            quiz[req.id] = req.body;
          // Question successfully edited
        //   res.status(200).json({ message: 'Question edited successfully', edited: quiz[req.id] });
            res.status(200).send(quiz)
        } else {
          // Question not found
          res.status(404).json({ message: 'Question not found' });
        }
      } else {
        // Invalid question ID
        res.status(400).json({ message: 'Invalid question ID' });
      }
    });

module.exports = testApiRouter;