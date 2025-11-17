import express from 'express';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { registerValidator } from './validations/auth.js';
import { validationResult } from "express-validator";
import UserModel from './models/User.js';


const uri = "mongodb://localhost:27017/blogDB";
// const uri = "mongodb+srv://admin:admin@blogprojectcluster.abnfthw.mongodb.net/?appName=BlogProjectCluster";
const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

mongoose.connect(uri)
.then(() => console.log('DB ok'))
.catch((err) => console.log('DB error', err));

const app = express();

app.use(express.json());

app.get('/', (req, res)=> {
    res.send('Hello World!');
});

app.post('/auth/register', registerValidator, async (req, res) => {
    try {
        const errors = validationResult(req);
        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const doc = new UserModel({
            email: req.body.email,
            fullName: req.body.fullName,
            avatarUrl: req.body.avatarUrl,
            passwordHash: hash,

        });

        const user = await doc.save();
        
        const token = jwt.sign({
            _id: user._id,
        }, 'secret123', {expiresIn: '30d'});

        const { passwordHash, ...userData } = user._doc;

        if (!errors.isEmpty()) {
            return res.status(400).json(errors.array());
        }

        res.json({
            success: true,
            user: userData,
            token,
        })
    } catch (error) {
        res.status(500).json({
            message: "Не удалось зарегистрироваться",
        });
    }
})

app.post('/auth/login', async (req, res) => {
    const { email, password } = req.body || {};

    try {
        const user = await UserModel.findOne({ email });
        console.log('user: ', user)

        if (!user) {
            return res.status(404).json({
                message: "Пользователь не найден",
            });
        }

        const isValidAccess = await bcrypt.compare(password, user.passwordHash);

        if (!isValidAccess) {
            return res.status(400).json({
                message: 'Неверный логин или пароль',
            })
        }

        const token = jwt.sign({
            _id: user._id,
        }, 'secret123', {expiresIn: '30d'});

        const { passwordHash, ...userData } = user._doc;

        res.json({
            success: true,
            user: userData,
            token,
        })

    } catch(err) {
        console.log(err);
        
        res.status(500).json({
            message: "Не удалось авторизоваться",
        });
    }
})

app.listen(4444, (err)=>{
    if(err) {
        return console.log(err);
    }

    console.log('Server OK');
}); 
