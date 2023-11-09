const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const connectToDatabase = require("../db/conn.js");
const { ObjectId } = require('mongodb');
require("../loadEnvironment.js");

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
  
  
  // Serializing a user determines which data of the user object should be stored in the session
  // pass a user object and a callback function called done after successful authentication
  passport.serializeUser((user, done) => {
    // console.log("\n===========serializeUser===================\n")
    // console.log(user)
    // done(error object, value to be stored)
    done(null, user._id);
    // stores it internally on req.session.passport
  });
  
  // user object can be retrieved from the session
  // pass the key that was used when we initially serialized a user (id)
  passport.deserializeUser(async (id, done) => {
    // console.log("---------> Deserialize Id")
    // console.log(id)
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
  // passport.deserializeUser((_id, done) => {
  //   console.log("---------> Deserialize Id")
  //   console.log(_id)

  //   done (null, {name: "Kyle", id: 123} )
  // }) 