import { JSX } from 'react';
import styles from './Header.module.scss';
import { Button, Container } from '@mui/material';
import { Link } from 'react-router';

export function Header (): JSX.Element {
    const isAuth = false;

    const onClickLogout = () => {};

    return (
       <div className ={ styles.root }>
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
    )
}
