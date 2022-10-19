const express = require('express');
const app = express();
const mongoose = require('mongoose');
const User = require('./models/user');
const Post = require('./models/post');
const Comment = require('./models/comment');


const mongoDb = 'mongodb://127.0.0.1/mongoose-test';
mongoose.connect(mongoDb, {useNewUrlParser: true});
const db = mongoose.connection;

db.once('open', () => {
    console.log(`Connected to mongoDb at ${db.host}:${db.port}`);
});

db.on('error', (error) => {
    console.log(`Database Error: ${error}`);
})

app.use(express.urlencoded({ extended: false}));



app.get('/', (req, res) => {
    res.json({
        message: "Hey Hey Hey!!"
    })

});

// ALL USERS
app.get('/users', (req, res) => {
    User.find({})
    .then(users => {
        console.log('All users', users);
        res.json({ users: users });
    })
    .catch(error => { 
        console.log('error', error);
        res.json({ message: "Error" });
    });
});

// ALL COMMENTS
app.get('/comments', (req, res) => {
    Comment.find({})
    .then(comments => {
        console.log("Comments: ", comments);
        res.json({comments: comments});
    })
    .catch(error => {
        console.log('error', error);
        res.json({message: "error error error"});
    });
});

// ALL POSTS
app.get('/posts', (req, res) => {
    Post.find({})
    .then(posts => {
        console.log('Posts: ', posts);
        res.json({posts: posts});
    })
    .catch(error => {
        console.log('error', error);
        res.json({ message: "error error error"});
    });
});


//  FIND ONE USER
app.get('/users/:email', (req, res) => {
    console.log('find user by', req.params.email)
    User.findOne({
        email: req.params.email
    })
    .then(user => {
        console.log('Here is the user', user.name);
        res.json({ user: user });
    })
    .catch(error => { 
        console.log('error', error);
        res.json({ message: "Error ocurred, please try again" });
    });
});


// CREATE A USER
app.post('/users', (req, res) => {
    User.create({
        name: req.body.name,
        email: req.body.email,
        meta: {
            age: req.body.age,
            website: req.body.website
        }
    })
    .then(user => {
        console.log('New user =>>', user);
        res.json({ user: user });
    })
    .catch(error => { 
        console.log('error', error) 
        res.json({ message: "Error ocurred, please try again" })
    });
});


// CREATE A POST
app.post('/posts', (req, res) => {
    Post.create({
        title: req.body.title,
        body: req.body.body
    })
    .then(post => {
        console.log('New Post =>>', post);
        res.json({ post: post });
    })
    .catch(error => { 
        console.log('error', error) 
        res.json({ message: "Error ocurred, please try again" })
    });
});

// UPDATE USER
app.put('/users/:email', (req, res) => {
    console.log('route is being on PUT')
    User.findOne({ email: req.params.email })
    .then(foundUser => {
        console.log('User found', foundUser);
        User.findOneAndUpdate({ email: req.params.email }, 
        { 
            name: req.body.name ? req.body.name : foundUser.name,
            email: req.body.email ? req.body.email : foundUser.email,
            meta: {
                age: req.body.age ? req.body.age : foundUser.age,
                website: req.body.website ? req.body.website : foundUser.website
            }
        })
        .then(user => {
            console.log('User was updated', user);
            res.json({ user: user })
        })
        .catch(error => {
            console.log('error', error) 
            res.json({ message: "Error ocurred" })
        })
    })
    .catch(error => {
        console.log('error', error) 
        res.json({ message: "Error ocurred" })
    })
    
});


// FIND ONE POST BY TITLE
app.get('/posts/:title', (req, res) => {
    console.log('find user by', req.params.title)
    User.findOne({
        title: req.params.title
    })
    .then(post => {
        console.log('Here is the user', post.body);
        res.json({ post: post });
    })
    .catch(error => { 
        console.log('error', error);
        res.json({ message: "Error ocurred, please try again" });
    });
});





app.get('/posts/:id', (req, res) => {
    console.log('find user by', req.params.id)
    User.findOne({
        id: req.params.id
    })
    .then(post => {
        console.log('Here is the user', user.name);
        res.json({ post: post });
    })
    .catch(error => { 
        console.log('error', error);
        res.json({ message: "Error ocurred, please try again" });
    });
});

// UPDATE POST
app.put('/posts/:id', (req, res) => {
    console.log('route is being on PUT')
    Post.findById(req.params.id)
    .then(foundPost => {
        console.log('Post found', foundPost);
        Post.findByIdAndUpdate(req.params.id, 
        { 
            title: req.body.title ? req.body.title : foundPost.title,
            body: req.body.body ? req.body.body : foundPost.body
        },{
            upsert: true
        })
        .then(post => {
            console.log('post was updated', post);
            res.redirect(`/posts/${req.params.id}`);
        })
        .catch(error => {
            console.log('error', error) 
            res.json({ message: "Error ocurred" })
        })
    })
    .catch(error => {
        console.log('error', error) 
        res.json({ message: "Error ocurred!!!" })
    })
    
});


// DELETE USER
app.delete('/users/:email', (req, res) => {
    User.findOneAndRemove({ email: req.params.email })
    .then(response => {
        console.log('This was delete', response);
        res.json({ message: `${req.params.email} was deleted`});
    })
    .catch(error => {
        console.log('error', error) 
        res.json({ message: "Error ocurred, please try again" });
    })
});


app.get('/comments/:id', (req, res) => {
    console.log('find comment by id: ', req.params.id)
    Comment.findOne({
        id: req.params.id
    })
    .then(comment => {
        console.log('Here is the user', comment);
        res.json({ comment: comment });
    })
    .catch(error => { 
        console.log('error', error);
        res.json({ message: "Error ocurred, please try again" });
    });
});


app.get('/posts/:id/comments', (req,res) => {
    Post.findById(req.params.id).populate('comments').exec()
    .then(post => {
        console.log('Post: ', post);
    })
})

app.post('/posts/:id/comments', (req,res) =>{
    Post.findById(req.params.id)
    .then(post => {
        console.log("post: ", post);
        // create and push comment inside of post next
        post.comments.push({
            header: req.body.header,
            content: req.body.content
        })
        // save the post
        post.save();
        res.redirect(`/posts/${req.params.id}`);
    })
    .catch(error => { 
        console.log('error', error);
        res.json({ message: "Error ocurred, please try again" });
    });
});


app.put('/comments/:id', (req, res) => {
    console.log('route is being on PUT')
    Comment.findOne(req.params.id )
    .then(foundComment => {
        console.log('User found', foundComment);
        Comment.findOneAndUpdate( req.params.id, 
        { 
            header: req.body.header ? req.body.header : foundComment.header,
            content: req.body.content ? req.body.content : foundComment.content,
        })
        .then(comment => {
            console.log('User was updated', comment);
            res.redirect(`/comments/${req.params.id}`);
        })
        .catch(error => {
            console.log('error', error) 
            res.json({ message: "Error ocurred" })
        })
    })
    .catch(error => {
        console.log('error', error) 
        res.json({ message: "Error ocurred" })
    })
    
});





// app.get('/findAll', (req,res) => {
//     User.find({}, (err, users) => {
//         if (err) res.send(`Failed to find record, mongodb error ${err}`);
//         res.send(users);
//     })
// })

// app.get('/findById/:id', (req,res) => {
//     User.findById(req.params.id, (err, users) => {
//         if (err) res.send(`Failed to find record by Id, mongodb error ${err}`);
//         res.send(users);
//     })
// })

// app.get('/findByEmail/:email', (req,res) => {
//     User.findOne({email: req.params.email}, (err, users) => {
//         if (err) res.send(`Failed to find record by email, mongodb error ${err}`);
//         res.send(users);
//     })
// })

app.listen(8000, () => {
    console.log('Running port 8000')
});