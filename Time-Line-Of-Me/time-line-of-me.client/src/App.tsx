import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LibraryProvider } from './context/LibraryContext.js';
import { Header } from './components/layout/Header.js';
import { HomePage } from './pages/HomePage.js';
import { AddBookPage } from './pages/AddBookPage.js';
import { FavoritesPage } from './pages/FavoritesPage.js';
import { ROUTES } from './utils/constants.js';

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

          <style>{`
            @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&display=swap');
            
            * {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            }
            
            .font-serif {
              font-family: 'Playfair Display', serif;
            }
            
            .bg-charcoal {
              background-color: #1a1a1a;
            }
            
            .text-ivory {
              color: #f4f1ea;
            }
            
            @keyframes fadeInUp {
              from {
                opacity: 0;
                transform: translateY(30px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
            
            ::-webkit-scrollbar {
              width: 10px;
            }
            
            ::-webkit-scrollbar-track {
              background: #1a1a1a;
            }
            
            ::-webkit-scrollbar-thumb {
              background: #4a4a4a;
              border-radius: 5px;
            }
            
            ::-webkit-scrollbar-thumb:hover {
              background: #666;
            }
          `}</style>
        </div>
      </LibraryProvider>
    </BrowserRouter>
  );
};


export default App;