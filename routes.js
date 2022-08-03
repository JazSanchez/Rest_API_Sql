'use strict';

const express = require('express');
const { Users, Courses } = require('./models');
const { authenticateUser } = require('./middleware/auth-user');
const router = express.Router();
const middleware = express();
middleware.use(express.json());



// Handler function to wrap each route.
function asyncHandler(cb) {
  return async (req, res, next) => {
    try {
      await cb(req, res, next);
    } catch (error) {
      // Forward error to the global error handler
      next(error);
    }
  };
}

// This array is used to keep track of user records
// as they are created.
const users = [];


// Route that returns a list of users.
router.get('/users', authenticateUser, asyncHandler(async (req, res) => {
  const user = req.currentUser;
  res.json({
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    emailAddress: user.emailAddress,

   
  });
  res.status(200).end();
}));

// Route that creates a new user.
router.post('/users', asyncHandler(async (req, res) => {
  // Get the user from the request body.
  const user = req.body;
  const errors = [];
  if(!firstName){
    errors.push('Please provide a value for "first name"')
  }

  if(!lastName){
    errors.push('Please provide a value for "last name"')
  }

  if (!user.email) {
    errors.push('Please provide a value for "email"');
  }
  let password = user.password;
  if (!password) {
    errors.push('Please provide a value for "password"');
  } else if (password.length < 8 || password.length > 20) {
    errors.push('Your password should be between 8 and 20 characters');
  } else {
    user.password = bcrypt.hashSync(password, 10);
  }

  // If there are any errors...
  if (errors.length > 0) {
    // Return the validation errors to the client.
    res.status(400).json({ errors });
  } else {
    // Add the user to the `users` array.
    users.push(user);

    // Set the status to 201 Created and end the response.
    res.status(201).end();
  }

// }
}));



router.get('/api/courses', asyncHandler( async (req, res) => {
 try{
   const courses = await Courses.findAll({
     include: [
       {
         model: Users,
       }
     ]
   });
   console.log(courses.map(course => course.get({ plain: true})));
   process.exit();

 }catch(error){
 
 }
}
));

router.get('/api/courses/:id', asyncHandler (async(req, res)=>{
 const courses = await Courses.findByPk(req.params.id, {
   include: [
     {
       model: Users,
     }
   ]
 })
}));


router.post('api/courses/:id', asyncHandler(async (req, res) => {
  const course = await Courses.findByPk(req.params.id, {
    include
  })

}));

router.put('/api/courses/:id', authenticateUser, asyncHandler(async (req, res) => {
 const course = await Courses.findByPk(req.params.id, {

 })
 await course.update(req.body);
}));

router.delete('/api/courses/:id', authenticateUser, asyncHandler(async (req, res) => {
  const coursesToDelete = await Courses.findByPk(req.params.id, {

   

});
  await coursesToDelete.destroy();
}));


module.exports = router;


