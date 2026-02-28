import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Header } from './Components/Header';
import { Container } from '@mui/material';
import { Home } from './Pages/Home';
import { Footer } from './Components/Footer';


function App () {
  return (
    <>
        <Header />
        <Container maxWidth='lg'>
            <Routes>
                <Route path='/' element={<Home />} />
            </Routes>
        </Container>

        <Footer />
    </>
  );
}

export default App;
