import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LibraryProvider } from './context/LibraryContext.js';
import { Header } from './components/layout/Header.js';
import { HomePage } from './pages/HomePage.js';
import { AddBookPage } from './pages/AddBookPage.js';
import { FavoritesPage } from './pages/FavoritesPage.js';
import { ROUTES } from './utils/constants.js';
import './App.css'

export const App: React.FC = () => {


  
  return (
    <BrowserRouter>
      <LibraryProvider>
        <div className="min-h-screen bg-charcoal">
          <Header />

          
          <Routes>
            <Route path={ROUTES.HOME} element={<HomePage />} />
            <Route path={ROUTES.ADD_BOOK} element={<AddBookPage />} />
            <Route path={ROUTES.FAVORITES} element={<FavoritesPage />} />
          </Routes>


        </div>
      </LibraryProvider>
    </BrowserRouter>
  );
};


export default App;