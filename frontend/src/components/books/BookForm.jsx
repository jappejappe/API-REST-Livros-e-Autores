import React, { useState, useEffect } from 'react';
import { bookService } from '../../services/bookService';
import { authorService } from '../../services/authorService';

const BookForm = ({ book, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    summary: '',
    authorId: '',
    publishedYear: '',
    genre: '',
    quality: '',
    isbn: '',
    pages: '',
    language: 'Português',
    publisher: ''
  });
  const [authors, setAuthors] = useState([]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadAuthors();
    if (book) {
      setFormData({
        title: book.title || '',
        summary: book.summary || '',
        authorId: book.authorId || '',
        publishedYear: book.publishedYear || '',
        genre: book.genre || '',
        quality: book.quality || '',
        isbn: book.isbn || '',
        pages: book.pages || '',
        language: book.language || 'Português',
        publisher: book.publisher || ''
      });
    }
  }, [book]);

  const loadAuthors = async () => {
    try {
      const response = await authorService.getAllAuthors();
      setAuthors(response.data || []);
    } catch (error) {
      console.error('Erro ao carregar autores:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Limpar erro do campo quando usuário começar a digitar
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Título é obrigatório';
    }

    if (!formData.summary.trim()) {
      newErrors.summary = 'Resumo é obrigatório';
    }

    if (!formData.authorId) {
      newErrors.authorId = 'Autor é obrigatório';
    }

    if (formData.publishedYear) {
      const year = parseInt(formData.publishedYear);
      const currentYear = new Date().getFullYear();
      if (isNaN(year) || year < 1000 || year > currentYear) {
        newErrors.publishedYear = 'Ano deve ser válido';
      }
    }

    if (formData.quality) {
      const quality = parseFloat(formData.quality);
      if (!isNaN(quality) && (quality < 1 || quality > 5)) {
        newErrors.quality = 'Qualidade deve ser entre 1 e 5';
      }
    }

    if (formData.pages) {
      const pages = parseInt(formData.pages);
      if (isNaN(pages) || pages <= 0) {
        newErrors.pages = 'Número de páginas deve ser positivo';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      let response;
      if (book) {
        response = await bookService.updateBook(book.id, formData);
      } else {
        response = await bookService.createBook(formData);
      }
      
      if (response.success) {
        onSave(response.data);
      }
    } catch (error) {
      const errorData = error.response?.data;
      if (errorData?.error?.details) {
        const newErrors = {};
        errorData.error.details.forEach(detail => {
          // Mapear erros para campos específicos
          if (detail.includes('Título')) newErrors.title = detail;
          else if (detail.includes('Resumo')) newErrors.summary = detail;
          else if (detail.includes('Autor')) newErrors.authorId = detail;
          else if (detail.includes('Ano')) newErrors.publishedYear = detail;
          else if (detail.includes('Qualidade')) newErrors.quality = detail;
          else if (detail.includes('páginas')) newErrors.pages = detail;
          else newErrors.general = detail;
        });
        setErrors(newErrors);
      } else {
        setErrors({ general: 'Erro ao salvar livro. Tente novamente.' });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <h2>{book ? 'Editar Livro' : 'Cadastrar Novo Livro'}</h2>
      
      {errors.general && (
        <div style={{ color: 'red', marginBottom: '16px', padding: '8px', backgroundColor: '#ffe6e6', borderRadius: '4px' }}>
          {errors.general}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Título do Livro *</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Digite o título do livro"
          />
          {errors.title && <div className="error">{errors.title}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="summary">Resumo do Livro *</label>
          <textarea
            id="summary"
            name="summary"
            value={formData.summary}
            onChange={handleChange}
            placeholder="Descreva brevemente sobre o que é o livro"
            rows="4"
            style={{ resize: 'vertical' }}
          />
          {errors.summary && <div className="error">{errors.summary}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="authorId">Autor *</label>
          <select
            id="authorId"
            name="authorId"
            value={formData.authorId}
            onChange={handleChange}
          >
            <option value="">Selecione um autor</option>
            {authors.map(author => (
              <option key={author.id} value={author.id}>
                {author.name}
              </option>
            ))}
          </select>
          {errors.authorId && <div className="error">{errors.authorId}</div>}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div className="form-group">
            <label htmlFor="publishedYear">Ano de Publicação</label>
            <input
              type="number"
              id="publishedYear"
              name="publishedYear"
              value={formData.publishedYear}
              onChange={handleChange}
              placeholder="Ex: 2023"
              min="1000"
              max={new Date().getFullYear()}
            />
            {errors.publishedYear && <div className="error">{errors.publishedYear}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="genre">Gênero</label>
            <input
              type="text"
              id="genre"
              name="genre"
              value={formData.genre}
              onChange={handleChange}
              placeholder="Ex: Ficção, Romance, Técnico"
            />
            {errors.genre && <div className="error">{errors.genre}</div>}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div className="form-group">
            <label htmlFor="quality">Qualidade (1-5)</label>
            <select
              id="quality"
              name="quality"
              value={formData.quality}
              onChange={handleChange}
            >
              <option value="">Selecione a qualidade</option>
              <option value="1">1 - Ruim</option>
              <option value="2">2 - Regular</option>
              <option value="3">3 - Bom</option>
              <option value="4">4 - Muito Bom</option>
              <option value="5">5 - Excelente</option>
            </select>
            {errors.quality && <div className="error">{errors.quality}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="pages">Número de Páginas</label>
            <input
              type="number"
              id="pages"
              name="pages"
              value={formData.pages}
              onChange={handleChange}
              placeholder="Ex: 350"
              min="1"
            />
            {errors.pages && <div className="error">{errors.pages}</div>}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div className="form-group">
            <label htmlFor="isbn">ISBN</label>
            <input
              type="text"
              id="isbn"
              name="isbn"
              value={formData.isbn}
              onChange={handleChange}
              placeholder="Ex: 978-85-123-4567-8"
            />
            {errors.isbn && <div className="error">{errors.isbn}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="language">Idioma</label>
            <select
              id="language"
              name="language"
              value={formData.language}
              onChange={handleChange}
            >
              <option value="Português">Português</option>
              <option value="Inglês">Inglês</option>
              <option value="Espanhol">Espanhol</option>
              <option value="Francês">Francês</option>
              <option value="Alemão">Alemão</option>
              <option value="Outro">Outro</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="publisher">Editora</label>
          <input
            type="text"
            id="publisher"
            name="publisher"
            value={formData.publisher}
            onChange={handleChange}
            placeholder="Nome da editora"
          />
        </div>

        <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? 'Salvando...' : (book ? 'Atualizar' : 'Cadastrar')}
          </button>
          <button 
            type="button" 
            className="btn"
            onClick={onCancel}
            style={{ backgroundColor: '#6c757d', color: 'white' }}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookForm;