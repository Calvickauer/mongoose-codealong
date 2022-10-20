// const express = require('express');
// const app = express();
// const mongoose = require('mongoose');
// const User = require('./models/user');
// const Post = require('./models/post');
// const Comment = require('./models/comment');


// const mongoDb = 'mongodb://127.0.0.1/mongoose-test';
// mongoose.connect(mongoDb, {useNewUrlParser: true});
// const db = mongoose.connection;

// db.once('open', () => {
//     console.log(`Connected to mongoDb at ${db.host}:${db.port}`);
// });

// db.on('error', (error) => {
//     console.log(`Database Error: ${error}`);
// })

// app.use(express.urlencoded({ extended: false}));



// app.get('/', (req, res) => {
//     res.json({
//         message: "Hey Hey Hey!!"
//     })

// });


// // USER ROUTES ///////////////

// app.get('/users', (req, res) => {
//     User.find({})
//     .then(users => {
//         console.log('All users', users);
//         res.json({ users: users });
//     })
//     .catch(error => { 
//         console.log('error', error);
//         res.json({ message: "Error ocurred, please try again" });
//     });
// });

// app.get('/users/:email', (req, res) => {
//     console.log('find user by', req.params.email)
//     User.findOne({
//         email: req.params.email
//     })
//     .then(user => {
//         console.log('Here is the user', user.name);
//         res.json({ user: user });
//     })
//     .catch(error => { 
//         console.log('error', error);
//         res.json({ message: "Error ocurred, please try again" });
//     });
// });

// app.post('/users', (req, res) => {
//     User.create({
//         name: req.body.name,
//         email: req.body.email,
//         meta: {
//             age: req.body.age,
//             website: req.body.website
//         }
//     })
//     .then(user => {
//         console.log('New user =>>', user);
//         res.json({ user: user });
//     })
//     .catch(error => { 
//         console.log('error', error) 
//         res.json({ message: "Error ocurred, please try again" })
//     });
// });

// app.put('/users/:email', (req, res) => {
//     console.log('route is being on PUT')
//     User.findOne({ email: req.params.email })
//     .then(foundUser => {
//         console.log('User found', foundUser);
//         User.findOneAndUpdate({ email: req.params.email }, { 
//                 name: req.body.name ? req.body.name : foundUser.name,
//                 email: req.body.email ? req.body.email : foundUser.email,
//                 meta: {
//                     age: req.body.age ? req.body.age : foundUser.age,
//                     website: req.body.website ? req.body.website : foundUser.website
//                 },
//         }, { 
//             upsert: true 
//         })
//         .then(user => {
//             console.log('User was updated', user);
//             res.json({ user: user })
//         })
//         .catch(error => {
//             console.log('error', error) 
//             res.json({ message: "Error ocurred, please try again" })
//         })
//     })
//     .catch(error => {
//         console.log('error', error) 
//         res.json({ message: "Error ocurred, please try again" })
//     })
    
// });

// app.delete('/users/:email', (req, res) => {
//     User.findOneAndRemove({ email: req.params.email })
//     .then(response => {
//         console.log('This was delete', response);
//         res.json({ message: `${req.params.email} was deleted`});
//     })
//     .catch(error => {
//         console.log('error', error) 
//         res.json({ message: "Error ocurred, please try again" });
//     })
// });

// // POST ROUTES /////////////////////

// app.get('/posts', (req, res) => {
//     Post.find({})
//     .then(posts => {
//         console.log('All posts', posts);
//         res.json({ posts: posts });
//     })
//     .catch(error => { 
//         console.log('error', error)
//         res.json({ message: 'Error occured, please try again' });
//     });
// });

// // app.get('/posts/:title', (req, res) => {
// //     console.log('find post by', req.params.title);
// //     Post.findOne({
// //         title: req.params.title
// //     })
// //     .then(post => {
// //         console.log('Here is the post', post);
// //         res.json({ post: post });
// //     })
// //     .catch(error => { 
// //         console.log('error', error);
// //         res.json({ message: "Error ocurred, please try again" });
// //     });
// // });

// app.get('/posts/:id', (req, res) => {
//     console.log('find post by ID', req.params.id);
//     // console.log(mongoose.Types.ObjectId(req.params.id))
//     Post.findOne({ _id: mongoose.Types.ObjectId(req.params.id) })
//     .then(post => {
//         console.log('Here is the post', post);
//         res.json({ post: post });
//     })
//     .catch(error => { 
//         console.log('error', error);
//         res.json({ message: "Error ocurred, please try again" });
//     });
// });


// app.post('/posts', (req, res) => {
//     Post.create({
//         title: req.body.title,
//         body: req.body.body,
//     })
//     .then(post => {
//         console.log('New post =>>', post);
//         res.json({ post: post });
//     })
//     .catch(error => { 
//         console.log('error', error) 
//         res.json({ message: "Error ocurred, please try again" })
//     });
// });

// app.put('/posts/:id', (req, res) => {
//     console.log('route is being on PUT')
//     Post.findById(req.params.id)
//     .then(foundPost => {
//         console.log('Post found', foundPost);
//         Post.findByIdAndUpdate(req.params.id, { 
//                 title: req.body.title ? req.body.title : foundPost.title,
//                 body: req.body.body ? req.body.body : foundPost.body,
//         }, { 
//             upsert: true 
//         })
//         .then(post => {
//             console.log('Post was updated', post);
//             res.redirect(`/posts/${req.params.id}`);
//         })
//         .catch(error => {
//             console.log('error', error) 
//             res.json({ message: "Error ocurred, please try again" })
//         })
//     })
//     .catch(error => {
//         console.log('error', error) 
//         res.json({ message: "Error ocurred, please try again" })
//     })
// });


// app.delete('/posts/:id', (req, res) => {
//     Post.findByIdAndRemove(req.params.id)
//     .then(response => {
//         console.log('This was deleted', response);
//         res.json({ message: `Post ${req.params.id} was deleted`});
//     })
//     .catch(error => {
//         console.log('error', error) 
//         res.json({ message: "Error ocurred, please try again" });
//     })
// });


// // ================ COMMENTS ROUTES ========================

// app.get('/comments', (req, res) => {
//     Comment.find({})
//     .then(comments => {
//         console.log('All comments', comments);
//         res.json({ comments: comments });
//     })
//     .catch(error => { 
//         console.log('error', error);
//         res.json({ message: "Error ocurred, please try again" });
//     });
// });

// app.get('/comments/:id', (req, res) => {
//     console.log('find comment by ID', req.params.id);
//     // console.log(mongoose.Types.ObjectId(req.params.id))
//     Comment.findOne({ _id: mongoose.Types.ObjectId(req.params.id) })
//     .then(comment => {
//         console.log('Here is the comment', comment);
//         res.json({ comment: comment });
//     })
//     .catch(error => { 
//         console.log('error', error);
//         res.json({ message: "Error ocurred, please try again" });
//     });
// });

// app.get('/posts/:id/comments', (req, res) => {
//     Post.findById(req.params.id).populate('comments').exec()
//     .then(post => {
//         console.log('Hey is the post', post);
//     })
// })


// app.post('/posts/:id/comments', (req, res) => {
//     Post.findById(req.params.id)
//     .then(post => {
//         console.log('Heyyy, this is the post', post);
//         // create and pust comment inside of post
//         Comment.create({
//             header: req.body.header,
//             content: req.body.content
//         })
//         .then(comment => {
//             post.comments.push(comment);
//             // save the post
//             post.save();
//             res.redirect(`/posts/${req.params.id}`);
//         })
//         .catch(error => { 
//             console.log('error', error);
//             res.json({ message: "Error ocurred, please try again" });
//         });
//     })
//     .catch(error => { 
//         console.log('error', error);
//         res.json({ message: "Error ocurred, please try again" });
//     });
// });

// app.put('/comments/:id', (req, res) => {
//     console.log('route is being on PUT')
//     Comment.findById(req.params.id)
//     .then(foundComment => {
//         console.log('Comment found', foundComment);
//         Comment.findByIdAndUpdate(req.params.id, { 
//                 header: req.body.header ? req.body.header : foundComment.header,
//                 content: req.body.content ? req.body.content : foundComment.content,
//         }, { 
//             upsert: true 
//         })
//         .then(comment => {
//             console.log('Comment was updated', comment);
//             res.redirect(`/comments/${req.params.id}`);
//         })
//         .catch(error => {
//             console.log('error', error) 
//             res.json({ message: "Error ocurred, please try again" })
//         })
//     })
//     .catch(error => {
//         console.log('error', error) 
//         res.json({ message: "Error ocurred, please try again" })
//     })
// });

// app.delete('/comments/:id', (req, res) => {
//     Comment.findByIdAndRemove(req.params.id)
//     .then(response => {
//         console.log('This was deleted', response);
//         res.json({ message: `Comment ${req.params.id} was deleted`});
//     })
//     .catch(error => {
//         console.log('error', error) 
//         res.json({ message: "Error ocurred, please try again" });
//     })
// });

// app.listen(8000, () => {
//     console.log('Running port 8000')
// });