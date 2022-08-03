'use strict';

const express = require('express');
const router = express.Router();
const Users = require('./models').Users;
const Courses = require('./models').Courses;
const { authenticateUsers } = require('./middleware/auth-user');





// Handler function to wrap each route.
function asyncHandler(cb){
  return async (req, res, next)=>{
    try {
      await cb(req,res, next);
    } catch(err){
      next(err);
    }
  };
}





//Route that returns a list of users.
router.get('/users', authenticateUsers, asyncHandler(async (req, res) => {
  const user = req.currentUser;
  res.status(200).json({
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    emailAddress: user.emailAddress
  })
}))




  //Route that creates a new user.
  router.post('/users', asyncHandler(async (req, res) => {
    try{
     await Users.create(re.body);
     res.status(201).json({'message': "Account successfully created"})
    }catch(error){
      console.log('Error', error.name);
      if(error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstrainError'){
      const errors = error.errors.map(err => err.message);
      res.status(400).json({errors});
      }else {
        throw error;
      }

    }
  }))

   
    


//Get
router.get('/courses', asyncHandler(async(req, res) =>{
  
    const courses = await Courses.findAll({
        include: [ 
            {
              model: Users,
              
            }
          ]
        });
        if(courses) {
        res.status(200).json(courses);
    } else{
      res.status(404).json({'message': 'Course not found'})
    }}
));


router.get('/courses/:id', asyncHandler(async (req, res) => {
       const courses = await Courses.findByPk(req.params.id, {
         include: [
           {
             model: Users,
           }
         ]

       });
       if(courses){
        res.status(200).json(courses);
       } else{
        res.status(404).json({'message': 'Course not found'})
      }
   
}));

router.post('/', authenticateUsers, asyncHandler( async (req, res) => {
try{
  if( req.boy.description && req.body.courses){
    const courses = await Courses.create({
      courses: req.body.course,
      description: req.body.description
    });
    res.status(201).json(courses);

  }else{
    res.status(400).json({ message: 'Course and description required'})
  }

}catch(error){
  console.log('Error', error.name);
      if(error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstrainError'){
      const errors = error.errors.map(err => err.message);
      res.status(400).json({errors});
      }else {
        throw error;
      }


}
}));


router.put('/:id', authenticateUsers, asyncHandler( async(req, res) => {
 try {
     const courses = await courses.findByPk(req.params.id);
     if (courses) {
        courses.courses = req.body.courses;
        courses.description = req.body.description;

        await Courses.update(courses);
        res.status(204).end();
     } else {
        res.status(404).json({message: 'Course not found'})
     }
 } catch (error) {
    res.status(500).json({message: error.message})
 }
}));


router.delete('/:id', authenticateUsers, asyncHandler(async (req, res) => {
 const course = await Courses.findByPk(req.params.id);
 if (course) {
     await course.destroy();
     res.status(204).end();
 } else {
     res.status(404).json({ message: 'Course not found' });
 }
}));

    
module.exports = router;


