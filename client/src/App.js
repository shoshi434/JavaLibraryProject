
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';
import BookManager from './components/Book/BookManager';
import CustomerManager from './components/Customer/CustomerManager';
import LendingManager from './components/Lending/LendingManager';
import './styles/global.css';
import './styles/forms.css';
import './styles/tables.css';
import './styles/enhancements.css';

// קומפוננט הניווט עם לוגיקת הטאב הפעיל
function Navigation() {
  const location = useLocation();
  
  const isActive = (path) => {
    if (path === '/books' && (location.pathname === '/' || location.pathname === '/books')) {
      return true;
    }
    return location.pathname === path;
  };

  return (
    <nav className="nav-tabs">
      <Link 
        to="/books" 
        className={`nav-tab ${isActive('/books') ? 'active' : ''}`}
      >
        📚 ספרים
      </Link>
      <Link 
        to="/customers" 
        className={`nav-tab ${isActive('/customers') ? 'active' : ''}`}
      >
        👥 לקוחות
      </Link>
      <Link 
        to="/lendings" 
        className={`nav-tab ${isActive('/lendings') ? 'active' : ''}`}
      >
        📋 השאלות
      </Link>
    </nav>
  );
}

function App() {
  return (
    <Router>
      <div className="app-container">
        {/* כותרת ראשית */}
        <header className="main-header">
          <h1>📚 מערכת ניהול ספרייה</h1>
          <p>מערכת מתקדמת לניהול ספרים, לקוחות והשאלות</p>
        </header>

        {/* ניווט טאבים */}
        <Navigation />

        {/* תוכן ראשי */}
        <main className="main-content">
          <Routes>
            <Route path="/" element={<BookManager />} />
            <Route path="/books" element={<BookManager />} />
            <Route path="/customers" element={<CustomerManager />} />
            <Route path="/lendings" element={<LendingManager />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
