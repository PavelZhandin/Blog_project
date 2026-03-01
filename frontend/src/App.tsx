import { Box, Container } from '@mui/material';
import { Route, Routes } from 'react-router-dom';

import { Footer } from './Components/Footer';
import { Header } from './Components/Header';
import { AddPost } from './Pages/AddPost';
import { FullPost } from './Pages/FullPost';
import { Home } from './Pages/Home';
import { Login } from './Pages/Login';
import { Registration } from './Pages/Registration';

function App () {
    return (
        <Box sx={{ minHeight: '100dvh', display: 'flex', flexDirection: 'column' }}>
            <Header />
            <Container component="main" maxWidth="lg" sx={{ flex: 1 }}>

                {/* <FullPost /> */}
                {/* <AddPost /> */}
                {/* <Login /> */}
                {/* <Registration /> */}
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/posts/:id" element={<FullPost />} />
                    <Route path="/add-post" element={<AddPost />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Registration />} />
                </Routes>
            </Container>

            <Footer />
        </Box>
    );
}

export default App;
