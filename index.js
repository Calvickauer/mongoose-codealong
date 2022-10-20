const express = require('express');
const app = express();
const mongoose = require('mongoose');
const User = require('./models/user');
const Post = require('./models/post');
const Comment = require('./models/comment');


const MONGOURL = process.env.MONGOURL;

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

app.use('/users', require('./controllers/users'));

app.use('/comments', require('./controllers/comments'));

app.use('/posts', require('./controllers/posts'));


app.listen(8000, () => {
    console.log('Running port 8000')
});