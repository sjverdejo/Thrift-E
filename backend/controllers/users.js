const config = require('../utils/config')
const s3Client = require('../utils/s3config')
const { PutObjectCommand, DeleteObjectCommand } = require ('@aws-sdk/client-s3')
const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/users')
const { findById } = require('../models/items')

//Just for testing
usersRouter.get('/', async (req, res) => {
  if (req.session.authenticated) {
    const users = await User.find({})

    res.json(users)
  } else {
    res.json({message:'Cant do it boss'})
  }
})

//POST route to create a new user
//Create a new user, does not need authentication //REGISTRATION
usersRouter.post('/', async (req, res) => {
  const { username, password } = req.body
  const dateCreated = new Date() //set date to current date

  if (password === '') { //if password does not exist send 404 status
    console.log('Failed to create user due to no password.')
    res.status(404).json({ message: 'Failed to create due to invalid password.' })
    return
  }

  //secure password with bcrypt
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    passwordHash,
    dateCreated
  })

  //if uploading image
  if (req.files) {
    //EVENTUALLY add validation for spaces in name
    const file =  req.files.file
    const fileName = username + '/profilepicture/' + req.files.file.name

    const bucketParams = {
      Bucket: config.AWS_S3_BUCKET_NAME,
      Key: fileName,
      Body: file.data,
    }

    try {
      await s3Client.send(new PutObjectCommand(bucketParams))
      user.profilePicture = fileName
    } catch (err) {
      console.log("Error here", err);
      res.status(404).json({message: 'Could not upload image'})
    }
  } else {
    user.profilePicture = 'void.png'
  }

  try {
    const savedUser = await user.save()
    res.status(201).json(savedUser)
    console.log('Successfully added user.')
  } catch (error) {
    console.log('Failed to create user due to no username/non unique.')
    res.status(404).json({ message: 'Failed to create due to invalid username.' })
  }
})

//GET route to retrieve specific user
//Return user with username
usersRouter.get('/:id', async (req, res) => {
  const id = req.params.id

  if (req.session.authenticated) { //ensure authenticated
    const user = await User.findById(id).populate('items')

    if (user) { //if user exists return
      console.log('Successfully retrieved.')
      res.json(user)
    } else {
      console.log('Failed to retrieve.')
      res.status(404).json({ message: 'Failed to retrieve.' })
    }
  } else {
    res.status(401).json({ message: 'Not Authenticated.'})
  }
})

//PUT route to update profile picture
usersRouter.put('/', async (req, res) => {
  if (req.session.authenticated) {
    const updateUser = await User.findById(req.session.user._id)

    if (updateUser) {
      if (req.files) {
        const fileName = updateUser.username + '/' + req.files.file.name
        const bucketParams = {
          Bucket: config.AWS_S3_BUCKET_NAME,
          Key: fileName,
          Body: req.files.file.data,
        }

        try {
          //if a user profile picture exists already, delete it
          if (updateUser.profilePicture !== 'void.png') {
            const toDeleteBucketParams = {
              Bucket: config.AWS_S3_BUCKET_NAME,
              Key: updateUser.profilePicture
            }
    
            //delete old profile picture
            await s3Client.send(new DeleteObjectCommand(toDeleteBucketParams))
          }
    
          await s3Client.send(new PutObjectCommand(bucketParams))
          updateUser.profilePicture = fileName
          await updateUser.save()
          res.json({message: 'Updated user.'})
        } catch (err) {
          console.log("Error here", err);
          res.status(404).json({message: 'Could not upload image.'})
        }
      } else {
        //return with no changes
        res.status(200).json({message: 'no changes.'})
        return
      }
    } else {
      res.status(401).json({ message: 'Not Authenticated.'})
    }
  } else {
    res.status(401).json({ message: 'Not Authenticated.'})
  }
})

//DELETE route to remove profile picture
usersRouter.delete('/', async (req, res) => {

  if (req.session.authenticated) {
    const user = await User.findById(req.session.user._id)

    if (user) {
      const bucketParams = {
        Bucket: config.AWS_S3_BUCKET_NAME,
        Key: user.profilePicture
      }

      try {
        await s3Client.send(new DeleteObjectCommand(bucketParams))
        user.profilePicture = 'void.png'
        await user.save()
        res.json({message: 'Deleted image successfully'})
      } catch (err) {
        console.log(err)
        res.status(404).json({message: 'Could not delete image.'})
      }
    } else {
      res.status(401).json({ message: 'Not Authenticated.'})
    }
  } else {
    res.status(401).json({ message: 'Not Authenticated.'})
  }
})

module.exports = usersRouter