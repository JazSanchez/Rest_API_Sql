'use strict';

const express = require('express');
const router = express.Router();
const { Users, Courses} = require('./models');
const { authenticateUser } = require('./middleware/auth-user');





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
router.get('/users', authenticateUser, asyncHandler(async (req, res) => {
  const user = req.currentUser;
  res.status(200).json({
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    emailAddress: user.emailAddress
  });

}))




  //Route that creates a new user.
  router.post('/users', asyncHandler(async (req, res) => {
    try{
     await Users.create(req.body);
     res.location("/");
     res.status(201).json({'message': "Account successfully created"})
    }catch(error){
      // console.log('Error', error.name);
      if(error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstrainError'){
      const errors = error.errors.map(err => err.message);
      res.status(400).json({errors});
      }else {
        throw error;
      }

    }
  }));

   
    


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

router.post('/courses', authenticateUser, asyncHandler( async (req, res) => {
try{
  const course = await Courses.create(req.body);
  res.location(`/courses/${course.id}`);
  res.status(201).end()

}catch(error){
      if(error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstrainError'){
      const errors = error.errors.map(err => err.message);
      res.status(400).json({errors});
      }else {
        throw error;
      }


}
}));


router.put('/courses/:id', authenticateUser, asyncHandler( async(req, res) => {
 try {
     const courses = await courses.findByPk(req.params.id);
     if (req.currentUser === Courses.userId) {
        await Courses.update(req.body);
        res.status(204).end();
     } else {
        res.status(404).json({message: 'Course not found'})
     }
 } catch (error) {
    res.status(500).json({message: error.message})
 }
}));


router.delete('/courses/:id', authenticateUser, asyncHandler(async (req, res) => {
 const course = await Courses.findByPk(req.params.id);
 if (course) {
   if(req.currentUser.id === course.userId){
     await course.destroy();
     res.status(204).end();
   }
 } else {
     res.status(404).json({ message: 'Course not found' });
 }
}));

    
module.exports = router;


