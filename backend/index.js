import express from 'express';
import mongoose from 'mongoose';
import { registerValidator, loginValidation, postCreateValidation } from './validations.js';
import { checkAuth } from './utils/checkAuth.js';
import * as UserController from './controllers/UserController.js';
import * as PostController from './controllers/postController.js';

const uri = "mongodb://localhost:27017/blogDB";

mongoose.connect(uri)
.then(() => console.log('DB ok'))
.catch((err) => console.log('DB error', err));

const app = express();

app.use(express.json());

app.get('/', (_, res)=> {
    res.send('Hello World!');
});

app.post('/auth/login', loginValidation, UserController.login);
app.post('/auth/register', registerValidator, UserController.register);
app.get('/auth/me', checkAuth, UserController.getMe);

app.post('/posts/create', checkAuth, postCreateValidation, PostController.createPost);
app.get('/posts', checkAuth, PostController.getAll);
app.get('/posts/:id', checkAuth, PostController.getById);
app.delete('/posts/:id', checkAuth, PostController.deletePost);
app.put('/posts/:id', checkAuth, PostController.updatePost);

app.listen(4444, (err) => {
    if(err) {
        return console.log(err);
    }

    console.log('Server OK');
}); 
