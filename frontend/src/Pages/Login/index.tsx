import { Button, Paper, TextField, Typography } from '@mui/material';
import styles from "./Login.module.scss";
import { JSX, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { ILoginData } from '../../Models/Auth';
import { fetchAuth, selectIsAuthorized } from '../../redux/slices/auth';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { useNavigate } from 'react-router';

export function Login (): JSX.Element {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const isAuth = useAppSelector(selectIsAuthorized);
    const { register, handleSubmit, formState: {errors, isValid } } = useForm({
        defaultValues: {
            email: 'test@gmail.com',
            password: '12345',
        },
        
        mode: 'onBlur',
    });

    /** Определяем когда успешно удалось авторизоваться и перенаправляемся на главную. */
    useEffect(() => {
        if (isAuth) {
            navigate('/');
        }
    }, [isAuth]);

    const onSubmit = async (values: ILoginData) => {
        try {
            const data = await dispatch(fetchAuth(values)).unwrap();
            
            if (data?.token) {
                window.localStorage.setItem('userToken', data?.token);
            } else {
                alert('Не удалось залогиниться');
            }
        } catch (err){
            console.warn(err);
        }
    };

    return (
        <Paper classes={{ root: styles.root }}>
            <Typography classes={{ root: styles.title }} variant="h5">
                Вход в аккаунт
            </Typography>

            <form onSubmit={ handleSubmit(onSubmit) }>
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
                    type='password'
                    className={styles.field}
                    label="Пароль"
                    error={ !!errors.password?.message }
                    helperText={ errors.password?.message }
                    {...register('password', { required: "Укажите пароль", minLength: { message: 'Минимальное количество символов - 5', value: 5 } })}
                    fullWidth
                />
                <Button disabled={ !isValid } type='submit' size="large" variant="contained" fullWidth>
                    Войти
                </Button>
            </form>
        </Paper>
    );
}
