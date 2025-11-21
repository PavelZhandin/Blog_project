import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { validationResult } from "express-validator";
import UserSchema from '../models/User.js';

export async function register (req, res) {
    try {
        const errors = validationResult(req);
        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const doc = new UserSchema({
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
}

export const login = async (req, res) => {
    const { email, password } = req.body || {};

    try {
        const user = await UserSchema.findOne({ email });
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
};

export const getMe = async (req, res) => {
    try {
        const user = await UserSchema.findById(req.userId);

        if (!user) {
            return res.status(404).json({
                message: 'Пользователь не найден',
            });
        }

        const { passwordHash, ...userData } = user._doc;


        res.json(userData)
    } catch (err) {
        console.log('Ошибка получения данных пользователя:', err);
        res.status(500).json({
            message: "Ошибка получения данных пользователя"
        })
    }
};
