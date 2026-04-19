import {
    Avatar, Button, Paper, TextField, Typography
} from '@mui/material';
import { JSX } from 'react';

import styles from './Login.module.scss';
import { useForm } from 'react-hook-form';
import { IRegisterData } from '../../Models/Auth';
import { useAppDispatch } from '../../redux/hooks';
import { fetchRegister } from '../../redux/slices/auth';

export function Registration(): JSX.Element {
    const dispatch = useAppDispatch();
    const { register, handleSubmit, formState: {errors, isValid } } = useForm({
        defaultValues: {
            fullName: 'Василий Пупыркин',
            email: 'test@gmail.com',
            password: '12345',
        },
        
        mode: 'onBlur',
    });

    const onSubmit = async (values: IRegisterData) => {
        try {
            const data = await dispatch(fetchRegister(values)).unwrap();
                
            if (data?.token) {
                window.localStorage.setItem('userToken', data?.token);
            } else {
                alert('Не удалось зарегистрироваться');
            }
            console.log(data);
        } catch (err){
            alert('Не удалось зарегистрироваться');
        }
    };

    return (
        <Paper classes={{ root: styles.root }}>
            <Typography classes={{ root: styles.title }} variant="h5">
                Создание аккаунта
            </Typography>

            <form onSubmit={ handleSubmit(onSubmit) }>            
                <div className={styles.avatar}>
                    <Avatar sx={{ width: 100, height: 100 }} />
                </div>
                <TextField
                    className={styles.field}
                    label="Полное имя"
                    error={ !!errors.fullName?.message }
                    helperText={ errors.fullName?.message }
                    {...register('fullName', { required: "Укажите имя"})}
                    fullWidth 
                />
                <TextField
                    type='email'
                    className={styles.field}
                    label="E-Mail"
                    error={ !!errors.email?.message }
                    helperText={ errors.email?.message }
                    {...register('email', { required: "Укажите почту"})}
                    fullWidth 
                />
                <TextField
                    className={styles.field}
                    label="Пароль"
                    {...register('password', { required: "Укажите пароль", minLength: { message: 'Минимальное количество символов - 5', value: 5 } })}
                    fullWidth 
                />

                <Button disabled={ !isValid } type='submit' size="large" variant="contained" fullWidth>
                    Зарегистрироваться
                </Button>
            </form>
        </Paper>
    );
}
