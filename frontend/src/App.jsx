import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import BookList from './components/books/BookList';
import BookForm from './components/books/BookForm';
import AuthorList from './components/authors/AuthorList';
import AuthorForm from './components/authors/AuthorForm';

function App() {
  const [currentView, setCurrentView] = useState('books');
  const [editingBook, setEditingBook] = useState(null);
  const [editingAuthor, setEditingAuthor] = useState(null);
  const [showBookForm, setShowBookForm] = useState(false);
  const [showAuthorForm, setShowAuthorForm] = useState(false);

  const handleBookSave = () => {
    setShowBookForm(false);
    setEditingBook(null);
    // A lista será recarregada automaticamente
  };

  const handleBookCancel = () => {
    setShowBookForm(false);
    setEditingBook(null);
  };

  const handleAuthorSave = () => {
    setShowAuthorForm(false);
    setEditingAuthor(null);
  };

  const handleAuthorCancel = () => {
    setShowAuthorForm(false);
    setEditingAuthor(null);
  };

  const handleEditBook = (book) => {
    setEditingBook(book);
    setShowBookForm(true);
  };

  const handleAddBook = () => {
    setEditingBook(null);
    setShowBookForm(true);
  };

  const handleEditAuthor = (author) => {
    setEditingAuthor(author);
    setShowAuthorForm(true);
  };

  const handleAddAuthor = () => {
    setEditingAuthor(null);
    setShowAuthorForm(true);
  };

  return (
    <Router>
      <div className="container">
        <header style={{ marginBottom: '30px', borderBottom: '1px solid #ddd', paddingBottom: '20px' }}>
          <h1>📚 Inventário de Livros e Autores</h1>
          <nav style={{ marginTop: '15px' }}>
            <Link 
              to="/" 
              style={{ 
                marginRight: '20px', 
                textDecoration: 'none', 
                color: currentView === 'books' ? '#007bff' : '#666',
                fontWeight: currentView === 'books' ? 'bold' : 'normal'
              }}
              onClick={() => {
                setCurrentView('books');
                setShowBookForm(false);
                setShowAuthorForm(false);
              }}
            >
              Meus Livros
            </Link>
            <Link 
              to="/authors" 
              style={{ 
                textDecoration: 'none', 
                color: currentView === 'authors' ? '#007bff' : '#666',
                fontWeight: currentView === 'authors' ? 'bold' : 'normal'
              }}
              onClick={() => {
                setCurrentView('authors');
                setShowBookForm(false);
                setShowAuthorForm(false);
              }}
            >
              Autores
            </Link>
          </nav>
        </header>

        <main>
          <Routes>
            <Route 
              path="/" 
              element={
                showBookForm ? (
                  <BookForm 
                    book={editingBook}
                    onSave={handleBookSave}
                    onCancel={handleBookCancel}
                  />
                ) : (
                  <BookList 
                    onEdit={handleEditBook}
                    onAdd={handleAddBook}
                  />
                )
              } 
            />
            <Route 
              path="/authors" 
              element={
                showAuthorForm ? (
                  <AuthorForm 
                    author={editingAuthor}
                    onSave={handleAuthorSave}
                    onCancel={handleAuthorCancel}
                  />
                ) : (
                  <AuthorList 
                    onEdit={handleEditAuthor}
                    onAdd={handleAddAuthor}
                  />
                )
              } 
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;