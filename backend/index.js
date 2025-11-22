import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';
import { registerValidator, loginValidation, postCreateValidation } from './validations.js';
import controllers from './controllers/index.js';
import { checkAuth, handleValidationErrors } from './utils/index.js';

const uri = "mongodb://localhost:27017/blogDB";

mongoose.connect(uri)
.then(() => console.log('DB ok'))
.catch((err) => console.log('DB error', err));

const app = express();

const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        cb(null, 'uploads');
    },
    filename: (_, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage });

app.use(express.json());
app.use('/uploads', express.static('uploads'))

app.get('/', (_, res)=> {
    res.send('Hello World!');
});

app.post('/auth/login', loginValidation, handleValidationErrors, controllers.UserController.login);
app.post('/auth/register', registerValidator, handleValidationErrors, controllers.UserController.register);
app.get('/auth/me', checkAuth, controllers.UserController.getMe);

app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
    res.json({
        success: true,
        url: `/uploads/${req.file.originalname}`,

    });
});

app.get('/posts', controllers.PostController.getAll);
app.get('/posts/:id', controllers.PostController.getById);
app.post('/posts/create', checkAuth, postCreateValidation, handleValidationErrors, controllers.PostController.createPost);
app.delete('/posts/:id', checkAuth, controllers.PostController.deletePost);
app.put('/posts/:id', checkAuth, controllers.PostController.updatePost);

app.listen(4444, (err) => {
    if(err) {
        return console.log(err);
    }

    console.log('Server OK');
}); 
