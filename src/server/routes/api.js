// Import packages //
const express = require('express');
const session = require("express-session");
const passport = require("passport");


const apiRouter = express.Router();
const store = new session.MemoryStore();

const connectToDatabase = require("./db/conn.js");
const { ObjectId } = require('mongodb');


// App config //
apiRouter.use(express.json());
apiRouter.use(express.urlencoded({ extended: false }));
require("./loadEnvironment.js");
require("./config/passport");




// generate unique session / Session Config
apiRouter.use(
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

// Passport Config //
// Initialize the passport library
apiRouter.use(passport.initialize());

// Implement a session with passport below /  include the session with passport
apiRouter.use(passport.session());


// Setting up endpoins //

apiRouter.get('/', async (req, res, next) => {
  const db = await connectToDatabase();
  let quizCollection = await db.collection("quiz");
  let quizData = await quizCollection.find({}).toArray();
  db.client.close();
  res.send(quizData)
});

apiRouter.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ message: 'Error during logout' });
    }
    return res.status(200).json({ message: 'Logged out successfully' });
  });
});

apiRouter.post('/login', (req, res, next) => {
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

apiRouter.post('/quiz/add', async (req, res, next) => {
  let newQuestion = req.body;
  
  const passportData = req.sessionStore.sessions[Object.keys(req.sessionStore.sessions)[0]];
  const user = JSON.parse(passportData).passport.user

  if (user !== process.env.ADMIN_ID){
    newQuestion.users = [ new ObjectId(`${process.env.ADMIN_ID}`), new ObjectId(`${user}`) ];
  } else {
    newQuestion.users = [ new ObjectId(user) ];
  }
  
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

apiRouter.put('/quiz/edit/:id', async (req, res, next) => {
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

apiRouter.delete('/quiz/:id', async (req, res, next) => {
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

module.exports = apiRouter;