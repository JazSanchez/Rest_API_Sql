'use strict';

const express = require('express');


// This array is used to keep track of user records
// as they are created.
const Users = [];

// Construct a router instance.
const router = express.Router();

// Route that returns a list of users.
router.get('/api/users', (req, res) => {
  res.json(Users);
});

// Route that creates a new user.
router.post('/api/users', (req, res) => {
  // Get the user from the request body.
  const User = req.body;

    Users.push(User);

    // Set the status to 201 Created and end the response.
    res.status(201).end();
  }
// }
);

module.exports = router;


