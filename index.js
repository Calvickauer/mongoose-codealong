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
            res.json({ message: "Error ocurred, please try again" })
        })
    })
    .catch(error => {
        console.log('error', error) 
        res.json({ message: "Error ocurred, please try again" })
    })
    
});


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

 // ================ POSTS ROUTES ========================

//  app.get('/posts', (req, res) => {
//     Post.find({})
//     .then(posts => {
//         console.log('All posts', posts);
//         res.json({ posts: posts });
//     })
//     .catch(error => { 
//         console.log('error', error) 
//     });
// });


// ================ COMMENTS ROUTES ========================

// app.get('/comments', (req, res) => {
//     Comment.find({})
//     .then(comments => {
//         console.log('All comments', comments);
//         res.json({ comments: comments });
//     })
//     .catch(error => { 
//         console.log('error', error) 
//     });
// });


// mongoose fetch statements
// app.get('/' , (req, res) => {
//     const bobby = new User({
//         name: 'Robert',
//         email: 'Bobby@test.com',
//         meta: {
//             age: 30, 
//             website: 'https://chris.me'
//         }
//     });
    
//     bobby.save((err) => {
//         if (err) return console.log(err);
//         console.log('User Created!');
//     });

//     res.send(bobby.sayHello());
// })

app.get('/findAll', (req,res) => {
    User.find({}, (err, users) => {
        if (err) res.send(`Failed to find record, mongodb error ${err}`);
        res.send(users);
    })
})

app.get('/findById/:id', (req,res) => {
    User.findById(req.params.id, (err, users) => {
        if (err) res.send(`Failed to find record by Id, mongodb error ${err}`);
        res.send(users);
    })

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


    //find by Id without the findByID command, not ideal
    // User.find({_id: mongoose.Types.ObjectId(Objreq.params.id)}, (err, users) => {
    //     if (err) res.send(`Failed to find record by Id, mongodb error ${err}`);
    //     res.send(users);
    // })
})

app.get('/findByEmail/:email', (req,res) => {
    User.findOne({email: req.params.email}, (err, users) => {
        if (err) res.send(`Failed to find record by email, mongodb error ${err}`);
        res.send(users);
    })
})

//Mongoose create statements
// creating users directly form model using model.save() and creating user using mode.Create
// User.create({
//     name: 'created using Create()',
//     email: 'Tester2@gmail.com'
// })

// const newUser = new User({
//     name: 'created using new USer and Save()',
//     email: 'Tester3@gmail.com'
// });

// newUser.save((err) => {
//     if (err) return console.log(err);
//     console.log('created new user');
// })

// Creating a simple post document in the post collection
// Post.create({
//     content: 'This ia pst content...'
// });

// Mongoose update statements

// User.updateOne({name: 'Robert'}, {
//     meta: {
//         age: 56
//     }
// }, (err, updateOutcome) => {
//     if(err) return console.log(err);
//     console.log(`updated user: ${updateOutcome.matchedCount} : ${updateOutcome.modifiedCount}`)
// });

// Returns full object prior to update
// User.findOneAndUpdate({name: 'Robert'},
// {
//     meta: {
//         age: 61,
//         website: 'somethingNew.com'
//     }
// }, (err, user) => {
//     if(err) return console.log(err);
//     console.log(user);
// })

// mongoose delete statements(deletes all that match)
// User.remove({name: 'Robert'}, (err) => {
//     if (err) return console.log(err)
//     console.log('user record deleted');
// })
// finds first instance of chris and deletes it
// User.findOneAndRemove({name: 'Chris'}, (err, user) => {
//     if(err) return console.log(err);
//     console.log(user);
// })



app.listen(8000, () => {
    console.log('Running port 8000')
});