const express=require('express')
const router=express.Router()
const {User}=require('../models/User')
const {authenticateUser}=require('../middlewares/authentication')

//localhost:3005/users/register
router.post('/register',function(req,res){
    const body=req.body
    const user=new User(body)
    user.save()
        .then((user) =>{
            res.send(user)
        })
        .catch(err =>{
            res.send(err)
        })

    //res.send('registration')

})

//localhost:3005/users/login
router.post('/login',function(req,res){
    const body=req.body

    User.findByCredentials(body.email, body.password)
         .then(function(user){
             return user.generateToken()
             //res.send(user)
         })
         .then(function(token){
             //res.setHeader('x-auth',token).send({})
             res.send(token)
         })
         .catch(function(err){
             res.send(err)
         })
})

//localhost:3005/users/account
router.get('/account',authenticateUser,function(req,res){
       const {user}=req
       res.send(user)
    })

//localhost:3005/users/logout
router.delete('/logout',authenticateUser,function(req,res){
      const {user,token}=req
      User.findByIdAndUpdate(user._id,{ $pull:{tokens:{token:token}}})
        .then(function(){
            res.send('successfully logged out')
        })
        .catch(function(err){
            res.send(err)
        })
})


 
module.exports={
    usersRouter:router
}
/*const User=require('../models/User')

module.exports.list=(req,res) =>{
    User.find()
        .then((users) =>{
            res.json(users)
        })
        .catch(err =>{
            res.json(err)
        })
}

module.exports.show=(req,res) =>{
    const id=req.params.id
    User.findById(id)
        .then(user =>{
            res.json(user)
        })
        .catch(err =>{
            res.json(err)
        })
}

module.exports.create=(req,res) =>{
    const data=req.body
    const user=new User(data)
    user.save()
        .then(user =>{
            res.json(user)
        })
        .catch(err =>{
            res.json(err)
        })
}

module.exports.update=(req,res) =>{
    const id=req.params.id
    const body=req.body
    User.findByIdAndUpdate(id, { $set: body }, { new: true, runValidators: true })
        .then(user =>{
            res.json(user)
        })
        .catch(err =>{
            res.json(err)
        })
}

module.exports.destroy=(req,res) =>{
    const id=req.params.id
    User.findByIdAndDelete(id)
        .then(user =>{
            res.json(user)
        })
        .catch(err =>{
            res.json(err)
        })
} */