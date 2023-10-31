const express = require('express');
const testApiRouter = express.Router();

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

testApiRouter.get('/', (req, res, next) => {
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