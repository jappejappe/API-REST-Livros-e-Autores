import React, { useState, useEffect } from 'react';
import { authorService } from '../../services/authorService';

const AuthorList = ({ onEdit, onAdd }) => {
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadAuthors();
  }, []);

  const loadAuthors = async () => {
    try {
      setLoading(true);
      const response = await authorService.getAllAuthors();
      setAuthors(response.data || []);
      setError('');
    } catch (error) {
      setError('Erro ao carregar autores');
      console.error('Erro ao carregar autores:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, name) => {
    if (window.confirm(`Tem certeza que deseja deletar o autor "${name}"?`)) {
      try {
        await authorService.deleteAuthor(id);
        setAuthors(authors.filter(author => author.id !== id));
      } catch (error) {
        const errorData = error.response?.data;
        if (errorData?.error?.code === 'CONFLICT') {
          alert(errorData.error.message);
        } else {
          alert('Erro ao deletar autor');
        }
        console.error('Erro ao deletar autor:', error);
      }
    }
  };

  if (loading) {
    return <div className="loading">Carregando autores...</div>;
  }

  if (error) {
    return (
      <div style={{ textAlign: 'center', padding: '20px' }}>
        <div style={{ color: 'red', marginBottom: '16px' }}>{error}</div>
        <button onClick={loadAuthors} className="btn btn-primary">
          Tentar Novamente
        </button>
      </div>
    );
  }

  return (
    <div>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '32px',
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        padding: '24px',
        borderRadius: '16px',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
      }}>
        <h2 style={{ 
          fontSize: '28px',
          fontWeight: '700',
          background: 'black',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          margin: 0
        }}>
          Autores
        </h2>
        <button onClick={onAdd} className="btn btn-primary">
          Cadastrar Novo Livro
        </button>
      </div>

      {authors.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px', backgroundColor: 'white', borderRadius: '8px' }}>
          <h3>Nenhum autor cadastrado</h3>
          <p style={{ color: '#565656ff', marginBottom: '20px' }}>
            Cadastre autores para poder adicionar livros!
          </p>
          <button onClick={onAdd} className="btn btn-primary">
            Cadastrar Primeiro Autor
          </button>
        </div>
      ) : (
        <div style={{ display: 'grid', gap: '16px' }}>
          {authors.map(author => (
            <div 
              key={author.id} 
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
                    {author.name}
                  </h3>
                  
                  {author.biography && (
                    <div style={{ marginBottom: '12px', color: '#565656ff', lineHeight: '1.4' }}>
                      {author.biography}
                    </div>
                  )}

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '8px', fontSize: '14px' }}>
                    {author.birthYear && (
                      <div><strong>Nascimento:</strong> {author.birthYear}</div>
                    )}
                    {author.nationality && (
                      <div><strong>Nacionalidade:</strong> {author.nationality}</div>
                    )}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '8px', marginLeft: '16px' }}>
                  <button 
                    onClick={() => onEdit(author)}
                    className="btn"
                    style={{ backgroundColor: '#716669', color: 'white', fontSize: '12px', padding: '6px 12px' }}
                  >
                    Editar
                  </button>
                  <button 
                    onClick={() => handleDelete(author.id, author.name)}
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

export default AuthorList;