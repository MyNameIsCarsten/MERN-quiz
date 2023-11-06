require("./loadEnvironment.js");

const express = require('express');
const testApiRouter = express.Router();
const session = require("express-session");
const store = new session.MemoryStore();
const cors = require('cors');
const bcrypt = require("bcrypt");

const connectToDatabase = require("./db/conn.js");
const { ObjectId } = require('mongodb');

// Allow cross-origin requests with specific configuration
testApiRouter.use(cors({
  origin: '*', // Replace with your allowed origins
  methods: 'DELETE',
}));

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

      // close connection to the database
      db.client.close();

      if (!user) {
        // If user not found, return null and false in the callback
        return done(null, false);
      }

      // Use bcrypt to hash the provided password
      bcrypt.hash(password, 10, async (err, hashedPassword) => {
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

const passwordHash = async (password, saltRounds) => {
  try {
  	// Generate salt:
    const salt = await bcrypt.genSalt(saltRounds);
	// Hash password using generated salt:
    const hash = await bcrypt.hash(password, salt);
		return hash;
  } catch (err) {
    console.log(err);
  }
  //  return null if there’s an error
  return null;
};


testApiRouter.post('/login', (req, res, next) => {
  console.log(req.body)
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).redirect('/login');
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      // return user data to the client
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

testApiRouter.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ message: 'Error during logout' });
    }
    return res.status(200).json({ message: 'Logged out successfully' });
  });
});


testApiRouter.get('/', async (req, res, next) => {
    const db = await connectToDatabase();
    let quizCollection = await db.collection("quiz");
    let quizData = await quizCollection.find({}).toArray();
    db.client.close();

    res.send(quizData)
});


testApiRouter.delete('/quiz/:id', async (req, res, next) => {
  const questionId = req.params.id;

  try {
    const db = await connectToDatabase();
    const quizCollection = db.collection("quiz");

    // Check if the provided ID is a valid ObjectId
    if (!ObjectId.isValid(questionId)) {
      return res.status(400).json({ message: 'Invalid question ID' });
    }

    const result = await quizCollection.deleteOne({ _id: new ObjectId(`${questionId}`) });

    if (result.deletedCount === 1) {
      res.status(200).json({ message: 'Question deleted successfully' });
    } else {
      res.status(404).json({ message: 'Question not found' });
    }

    db.client.close();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


testApiRouter.post('/quiz/add', async (req, res, next) => {
  const newQuestion = req.body;
  const db = await connectToDatabase();
  const quizCollection = db.collection("quiz");
  
  if (newQuestion) {
    try {
        const result = await quizCollection.insertOne(newQuestion);
        db.client.close();

        if (result.insertedId) {
          
            res.status(201).send(newQuestion);
        } else {
            res.status(500).send('Failed to insert the question');
        }
    } catch (error) {
        db.client.close();
        console.error(error);
        res.status(500).send('Internal server error');
    }
} else {
    db.client.close();
    res.status(400).send('Bad request');
}
});

testApiRouter.put('/quiz/edit/:id', async (req, res, next) => {
    const db = await connectToDatabase();
    const quizCollection = db.collection("quiz");
    const questionId = req.params.id;

    try {
      // Check if the provided ID is a valid ObjectId
      if (!ObjectId.isValid(questionId)) {
        return res.status(400).json({ message: 'Invalid question ID' });
      }
  
      // Find the document to edit using the _id field
      const question = await quizCollection.findOne({ _id: new ObjectId(questionId) });
  
      if (question) {
        // Update the document with the new data
        await quizCollection.updateOne({ _id: new ObjectId(questionId) }, { $set: req.body });
  
        // Question successfully edited
        res.status(200).json({ message: 'Question edited successfully', edited: req.body });
      } else {
        // Question not found
        res.status(404).json({ message: 'Question not found' });
      }
    } catch (error) {
      // Handle any errors that occur during the process
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    } finally {
      // Close the database connection
      db.client.close();
    }
  });

module.exports = testApiRouter;