import React, { useState, useEffect } from 'react';
import { bookService } from '../../services/bookService';

const BookList = ({ onEdit, onAdd }) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadBooks();
  }, []);

  const loadBooks = async () => {
    try {
      setLoading(true);
      const response = await bookService.getAllBooks();
      setBooks(response.data || []);
      setError('');
    } catch (error) {
      setError('Erro ao carregar livros');
      console.error('Erro ao carregar livros:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, title) => {
    if (window.confirm(`Tem certeza que deseja deletar o livro "${title}"?`)) {
      try {
        await bookService.deleteBook(id);
        setBooks(books.filter(book => book.id !== id));
      } catch (error) {
        alert('Erro ao deletar livro');
        console.error('Erro ao deletar livro:', error);
      }
    }
  };

  const getQualityText = (quality) => {
    const qualityMap = {
      '1': '⭐ Ruim',
      '2': '⭐⭐ Regular',
      '3': '⭐⭐⭐ Bom',
      '4': '⭐⭐⭐⭐ Muito Bom',
      '5': '⭐⭐⭐⭐⭐ Excelente'
    };
    return qualityMap[quality] || quality;
  };

  if (loading) {
    return <div className="loading">Carregando livros...</div>;
  }

  if (error) {
    return (
      <div style={{ textAlign: 'center', padding: '20px' }}>
        <div style={{ color: 'red', marginBottom: '16px' }}>{error}</div>
        <button onClick={loadBooks} className="btn btn-primary">
          Tentar Novamente
        </button>
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h2>Meus Livros ({books.length})</h2>
        <button onClick={onAdd} className="btn btn-primary">
          + Cadastrar Novo Livro
        </button>
      </div>

      {books.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px', backgroundColor: 'white', borderRadius: '8px' }}>
          <h3>Nenhum livro cadastrado</h3>
          <p style={{ color: '#666', marginBottom: '20px' }}>
            Comece cadastrando seu primeiro livro!
          </p>
          <button onClick={onAdd} className="btn btn-primary">
            Cadastrar Primeiro Livro
          </button>
        </div>
      ) : (
        <div style={{ display: 'grid', gap: '16px' }}>
          {books.map(book => (
            <div 
              key={book.id} 
              style={{ 
                backgroundColor: 'white', 
                padding: '20px', 
                borderRadius: '8px', 
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                border: '1px solid #e0e0e0'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ flex: 1 }}>
                  <h3 style={{ margin: '0 0 8px 0', color: '#333' }}>
                    {book.title}
                  </h3>
                  
                  <div style={{ marginBottom: '12px' }}>
                    <strong>Autor:</strong> {book.author ? book.author.name : 'Autor não encontrado'}
                  </div>

                  <div style={{ marginBottom: '12px', color: '#666', lineHeight: '1.4' }}>
                    <strong>Resumo:</strong> {book.summary}
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '8px', fontSize: '14px' }}>
                    {book.publishedYear && (
                      <div><strong>Ano:</strong> {book.publishedYear}</div>
                    )}
                    {book.genre && (
                      <div><strong>Gênero:</strong> {book.genre}</div>
                    )}
                    {book.quality && (
                      <div><strong>Qualidade:</strong> {getQualityText(book.quality)}</div>
                    )}
                    {book.pages && (
                      <div><strong>Páginas:</strong> {book.pages}</div>
                    )}
                    {book.language && (
                      <div><strong>Idioma:</strong> {book.language}</div>
                    )}
                    {book.publisher && (
                      <div><strong>Editora:</strong> {book.publisher}</div>
                    )}
                    {book.isbn && (
                      <div><strong>ISBN:</strong> {book.isbn}</div>
                    )}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '8px', marginLeft: '16px' }}>
                  <button 
                    onClick={() => onEdit(book)}
                    className="btn"
                    style={{ backgroundColor: '#28a745', color: 'white', fontSize: '12px', padding: '6px 12px' }}
                  >
                    Editar
                  </button>
                  <button 
                    onClick={() => handleDelete(book.id, book.title)}
                    className="btn btn-danger"
                    style={{ fontSize: '12px', padding: '6px 12px' }}
                  >
                    Deletar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookList;