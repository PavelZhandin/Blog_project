import { Button, Container } from '@mui/material';
import { JSX } from 'react';
import { Link } from 'react-router';

import styles from './Header.module.scss';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { fetchLogout, selectIsAuthSuccess } from '../../redux/slices/auth';

export function Header (): JSX.Element {
    const isAuth = useAppSelector(selectIsAuthSuccess);
    const dispatch = useAppDispatch();

    const onClickLogout = () => {
        dispatch(fetchLogout());
        window.localStorage.removeItem('userToken');
    };

    return (
        <div className={styles.root}>
            <Container maxWidth="lg">
                <div className={styles.inner}>
                    <Link className={styles.logo} to="/">
                        <div>ARCHAKOV BLOG</div>
                    </Link>
                    <div className={styles.buttons}>
                        {isAuth ? (
                            <>
                                <Link to="/posts/create">
                                    <Button variant="contained">Написать статью</Button>
                                </Link>
                                <Button onClick={onClickLogout} variant="contained" color="error">
                                    Выйти
                                </Button>
                            </>
                        ) : (
                            <>
                                <Link to="/login">
                                    <Button variant="outlined">Войти</Button>
                                </Link>
                                <Link to="/register">
                                    <Button variant="contained">Создать аккаунт</Button>
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </Container>
        </div>
    );
}
