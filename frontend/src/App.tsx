import { Box, Container } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import { Footer } from './Components/Footer';
import { Header } from './Components/Header';
import { AddPost } from './Pages/AddPost';
import { FullPost } from './Pages/FullPost';
import { Home } from './Pages/Home';
import { Login } from './Pages/Login';
import { Registration } from './Pages/Registration';
import { useEffect } from 'react';
import { fetchAuthMe } from './redux/slices/auth';
import { useAppDispatch } from './redux/hooks';

function App () {
    const dispatch = useAppDispatch();
    const userToken = window.localStorage.getItem('userToken');

    useEffect(() => {
        if (!!userToken) {
            dispatch(fetchAuthMe());
        }
    }, []);


    return (
        <Box sx={{ minHeight: '100dvh', display: 'flex', flexDirection: 'column' }}>
            <Header />
            <Container component="main" maxWidth="lg" sx={{ flex: 1 }}>
                <Routes>
                    <Route path="/" element={ <Home /> } />
                    <Route path="/posts/:id" element={ <FullPost /> } />
                    <Route path="/posts/:id/edit" element={ <AddPost /> } />
                    <Route path="/add-post" element={ <AddPost />} />
                    <Route path="/login" element={ <Login /> } />
                    <Route path="/register" element={ <Registration /> } />
                </Routes>
            </Container>

            <Footer />
        </Box>
    );
}

export default App;
