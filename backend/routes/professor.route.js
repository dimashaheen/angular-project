const express = require('express');
const app = express();
const professorRoute = express.Router();
// Professor model
let Professor = require('../model/Professor');
// Add Professor
professorRoute.route('/addProfessor').post((req, res, next) => {
    Professor.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
});
// Get all Professor
professorRoute.route('/').get((req, res) => {
    Professor.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})
// Get single Professor
professorRoute.route('/readProfessor/:id').get((req, res) => {
    Professor.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Update Professor
professorRoute.route('/updateProfessor/:id').put((req, res, next) => {
    Professor.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      return next(error);
      console.log(error)
    } else {
      res.json(data)
      console.log('Professor successfully updated!')
    }
  })
})
// Delete Professor
professorRoute.route('/deleteProfessor/:id').delete((req, res, next) => {
    Professor.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
})
module.exports = professorRoute;